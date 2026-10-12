---
layout: post
title: "Conditional execution with a DSL in Ruby"
modified: 2018-05-28 00:41:06 +0300
description: "A how-to describing an alternative to the if clause in Ruby."
tags: [ruby, dsl, if, clause, condition]
comments: true
share: true
---

I'm a fan of minimalistic, clear code. Recently, I've faced some repetitive code. I believe everyone should keep code as DRY (don't repeat yourself) as possible. The code was like this: call a third-party API, check the response, do something if it's successful and something else if it isn't. Basic code, but the implementation is boring.

### Problem

To avoid being verbose and repeating what I've already said, I'll just provide a code example:

```ruby
response = StripeCall.new(number: 'valid').call
if response.success?
  puts response.body
else
  puts response.body
end
```

Basically, there's no issue with this code. But I find it's not good enough because there are too many details to keep in mind:
- the public interfaces of two classes must be known (`StripeCall` and the class of the `response` object);
- don't forget to check the response wherever it's used, using an `if` clause;
- don't forget to instantiate `StripeCall` properly (pass `params` to `new`, not `call`).

There may be other objections, but unfortunately I can't identify them for now. All in all, we are humans, and everyone has their own feelings.

### Solution

In my experience, these bad feelings can be eliminated by introducing a DSL. Start with imagination, but don't go too far from Ruby syntax (otherwise we'd need to implement a new language, and I don't want that today because I'm good with Ruby). Firstly, we can remove the need to remember whether to pass `params` to `new` or `call` by defining `call` at the class level. Then, knowing that `.call(params)` can be replaced with `.(params)`, we reduce the number of typed characters. After that, knowledge from other languages comes into play: JavaScript has pretty syntax for similar cases, like `.onSuccess(func1).onError(func2)`. I personally find it useful and handy. So the final solution could look like this:


```ruby
StripeCall.(number: 'valid')
  .on_success { |response| puts response.body }
  .on_error { |response| puts response.body }
```

Let's implement it:

```ruby
# A base class for all classes implement calls to API.
class ApiCall
  attr_reader :params

  def self.call(params)
    new(params).call
  end

  def initialize(params)
    @params = params
  end

  def call
    @res = execute
    self
  end

  def on_success
    yield @res if @res.success
    self
  end

  def on_error
    yield @res unless @res.success
    self
  end

  private

  def execute
    fail NotImplementedError
  end
end
```

```ruby
# A concrete class implements call to API.
class StripeCall < ApiCall
  Response = Struct.new(:success, :body)

  private

  def execute
    success = params[:number] == 'valid'
    body = success ? 'ok response' : 'bad response'
    Response.new(success, body)
  end
end
```

Now the code is ready to be played with:

```ruby
StripeCall.(number: 'valid')
  .on_success { |response| puts response.body }
  .on_error { |response| puts response.body }
# => ok response

StripeCall.(number: 'invalid')
  .on_success { |response| puts response.body }
  .on_error { |response| puts response.body }
# => bad response
```


Actually, defining blocks everywhere can be annoying. Therefore, this is simplified as well:

```ruby
def handle_success(response)
  puts response.body
end

def handle_error(response)
  puts response.body
end

StripeCall.(number: 'valid')
  .on_success(&method(:handle_success))
  .on_error(&method(:handle_error))
```

Now only 1 class interface needs to be memorized: `StripeCall`. The number of lines is reduced from 6 to 3 (not counting the implementation of the conditional branches). But this DSL's main strength is that implementation is hidden, and exceptions can be raised and caught along the way. Catching and processing them in the base class reduces even more repetitive code.

For example, the call method of the base class could be implemented like this:

```ruby
class ApiCall
  ...
  def call
    @res = begin
             execute
           rescue StripeError => e
             OpenStruct.new(success: false)
           end
    self
  end
  ...
end
```

### Conclusion

A big project usually has a lot of code (surprise!). Every new line increases coupling and introduces complications. It gets harder to maintain and test, especially when it doesn't follow the [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) paradigm — in other words, when it's repetitive. Keep your code clean, and don't hesitate to introduce a DSL to solve YOUR issues. This way, the code will be readable and close to the business domain, as every developer dreams. Happy coding!

