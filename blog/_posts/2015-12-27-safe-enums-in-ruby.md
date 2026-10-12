---
layout: post
title: "Safe enums in Ruby"
description: "An implementation of safe enums in Ruby. Why, and what for? Read this post about the
              mezuka/enum gem."
modified: 2015-12-27 17:03:55 +0300
tags: [ruby, gem]
comments: true
share: true
---

For people who came to Ruby from Java, C# and similar OOP languages, it may be very
surprising that Ruby doesn't have an enum implementation out of the box. Someone could argue that
there is a `Symbol` type in Ruby, and using it instead would be enough. Well, that may be true for
a very small project, but if you have a big one, things get much harder.

**TL;DR:** use [this gem](https://github.com/mezuka/enum).

## What the heck?

Firstly, let's try to understand what *enums* are, which issues they solve and why they were
invented. I will quote [Wikipedia](https://en.wikipedia.org/wiki/Enumerated_type#Rationale) for this:

> *...* If a programmer wanted a variable, for example `myColor`, to have a value of `red`, the variable `red` would be declared and assigned **some arbitrary value**, usually an integer constant. The variable `red` would then be assigned to `myColor`*...*

> These arbitrary values were sometimes referred to as **magic numbers** since there often was no explanation as to how the numbers were obtained or whether their actual values were significant. These magic numbers could make the source code harder for others to understand and maintain.

> Enumerated types, on the other hand, made the code more self-documenting. Depending on the language, the compiler could automatically assign default values to the enumerators thereby hiding unnecessary detail from the programmer. These values may not even be visible to the programmer. Enumerated types can also prevent a programmer from writing illogical code such as performing mathematical operations on the values of the enumerators. If the value of a variable that was assigned an enumerator were to be printed, some programming languages could also print the name of the enumerator rather than its underlying numerical value. A further advantage is that enumerated types can allow compilers to enforce semantic correctness. For instance:
`myColor = TRIANGLE`
can be forbidden, whilst
`myColor = RED`
is accepted, even if `TRIANGLE` and `RED` are both internally represented as `1`.

> Conceptually, an enumerated type is similar to a list of nominals (numeric codes), since each possible value of the type is assigned a distinctive natural number. A given enumerated type is thus a concrete implementation of this notion. When order is meaningful and/or used for comparison, then an enumerated type becomes an ordinal type.

In brief, we currently have enum implementations in many programming languages (note that only **Python** from the scripting family implements them, and interestingly, only starting with one of its latest versions, 3.4). Earlier, people used integers to enumerate values, and this approach had drawbacks. In programming, the enum type basically addresses these issues:

- Unpredictable behavior;
- Maintenance;
- Code readability.

And this type has the following characteristics:

- It defines a set of identifiers (set of named values, called enumerators of the type or elements);
- The elements behave as constants;
- A variable declared as having an enumerated type can be assigned any of its elements.

Notably, neither existing Symbols nor other standard Ruby types cover the entire enum definition.

## The solution

In our project ([Mezuka](https://mezuka.com)), we have many entities that should behave like enums. We used one of the existing gems (to be honest, I had used many Ruby enum implementations in my projects before). But it didn't fit us and had unnecessary functionality. During yet another refactoring, we introduced our own library that solves these issues and completely fits us. Finally, we released this [gem](https://github.com/mezuka/enum), called [safe-enum](https://rubygems.org/gems/safe-enum).

So what issues does it solve?

- Serialization into the DB — the value should be read back as it was written and represented in Ruby without pitfalls;
- Safety — if an enum value is not defined, I should get a runtime error (ideally a compilation error, but remember, in Ruby we don't have a compiler);
- Easy definition — a simple DSL;
- It should be an ordinal type - we should be able to compare the enum values and sort them sometimes;
- It should be used in pure Ruby classes (not only with ActiveRecord or other ORM);
- Easy internationalization (I18n) of enum values and maintenance of their keys.

And these are the [gem](https://rubygems.org/gems/safe-enum)'s architectural decisions that allow us to implement it as we wanted:

- Because enum values should be written to the DB, integers have disadvantages, and symbols (or atoms) are not supported by our DB (PostgreSQL), all enum values are represented only as strings in the gem's internals.
- Enums are saved in a `Set` to quickly determine whether a value is valid and defined;
- The definition order is preserved, and values have an integer representation for comparison (just their definition index, for simplicity);
- An **exception** is raised when attempting to use an undefined enum value;
- An easy-to-use DSL defines enum values and I18n keys.

Here are a few examples of using the gem:

{% highlight ruby %}
require 'enum'
require 'i18n'
require 'yaml'


# The enum values definition feature demo:
class Side < Enum::Base
  values :left, :right
end


# The safe enums retrieving feature demo:
Side.enum(:left) # => "left"
Side.enum('left') # => "left"
Side.enum(:invalid) # => Enum::TokenNotFoundError: token 'invalid'' not found in the enum Side
Side.enum('invalid') # => Enum::TokenNotFoundError: token 'invalid'' not found in the enum Side
Side.all # => ['left', 'rigth', 'whole']
Side.enums(:left, :right) # => ['left', 'right']


# The I18n feature demo:
I18n.enforce_available_locales = false

# This is the content of yaml file that holds the enum values translations:
translations = <<-YAML
enum:
  Side:
    left: 'Left'
    right: 'Right'
YAML

I18n.backend.store_translations(I18n.locale, YAML.load(translations))

Side.name(:left) # => "Left"
Side.name('left') # => "Left"
Side.name(:right) # => "Right"
Side.name('right') # => "Right"
Side.name(:invalid) # => Enum::TokenNotFoundError: token 'invalid'' not found in the enum Side

# The enum values comparison feature demo:
class WeekDay < Enum::Base
  values :sunday, :monday, :tuesday, :wednesday, :thusday, :friday, :saturday
end
WeekDay.index(:sunday) == Date.new(2015, 9, 13).wday # => true
WeekDay.index(:monday) # => 1
WeekDay.indexes # => [0, 1, 2, 3, 4, 5, 6]
{% endhighlight %}

> Note: I18n functionality is optional. If you don't have I18n installed in your project, a NameError exception will be raised when calling the name method.


As a bonus we introduced safe setters and convenient predicates in order to manipulate the enum values in a Ruby object:

{% highlight ruby %}
class Table
  extend Enum::Predicates

  attr_accessor :side

  enumerize :side, Side
end

@table = Table.new
@table.side_is?(:left) # => false
@table.side_is?(nil) # => false

@table.side = Side.enum(:left)
@table.side_is?(:left) # => true
@table.side_is?(:right) # => false
@table.side_is?(nil) # => false
@table.side_is?(:invalid) # => Enum::TokenNotFoundError: token 'invalid'' not found in the enum Side

@table.side = 'invalid'
@table.side_is?(nil) # => false
@table.side_is?(:left) # => Enum::TokenNotFoundError: token 'invalid'' not found in the enum Side
@table.side_any?(:left, :right) # => true
@table.side_any?(:right) # => false
@table.side_any?(:invalid, :left) # => Enum::TokenNotFoundError: token 'invalid'' not found in the enum Side
{% endhighlight %}

> If you pass `nil` to the predicate or have a `nil` value in the field, the result will always be `false`. If you want to check whether the field is `nil`, just use Ruby's standard `nil?` method.

## Alternatives

There are many other gems that try to implement Ruby enums, but as I already said, none suits us. There are many reasons why. I won't review them separately in this post, but briefly, all of them violate the rule that **enums should behave like constants**. Some implementations break other rules of the enum definition or have redundancy.

## Conclusion

In our gem, we tried to follow the enum definition rules while having a solution that's easy to use and maintain. I think we managed this. If you have feedback, please comment or post issues on [github](https://github.com/mezuka/enum/issues). Your pull requests are always welcome.
