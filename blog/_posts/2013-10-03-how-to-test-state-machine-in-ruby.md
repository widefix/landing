---
layout: post
title: "How to test a state machine in Ruby"
description: "I've invented an approach that gets rid of the headache of testing a state machine in Ruby.
This solution is currently only for RSpec, but the approach can be used for test unit as well."
tags: [rspec, ruby]
share: true
comments: true
redirect_from:
  - /blog/2013/10/03/how-to-test-state-machine-in-ruby/
---

I could not find any worthwhile solution for testing a [state machine](https://github.com/pluginaweek/state_machine) with RSpec.
Until now, I had found only one solution, proposed by [stackoverflow](http://stackoverflow.com/questions/3047630/rails-how-to-test-state-machine) users. But this approach has some disadvantages, and in this post I will try to explain what they are and how
to avoid them.

## What we have

Assume that we have to simulate the following automatic gearbox shifting:

![Hyundai automatic gearshift](/blog/images/gearshift.jpg)

This image will show which operations and states we have:

![Gearbox levels](/blog/images/state_machine.jpg)

I use this [state machine gem](https://github.com/pluginaweek/state_machine) and RSpec for tests. Here is a possible class
with the gearshift state flow:

{% highlight ruby %}
class GearBox
  state_machine :gear, :initial => :P do
    event :switch_to_r do
      transition [:P, :N] => :R
    end

    event :switch_to_n do
      transition [:R, :D] => :N
    end

    event :switch_to_d do
      transition :N => :D
    end

    event :switch_to_p do
      transition :R => :P
    end
  end
end
{% endhighlight %}

## Headache

[Stack Overflow users propose](http://stackoverflow.com/questions/3047630/rails-how-to-test-state-machine) building an object and then changing its state step by step with generated event methods. The possible
tests for this situation would look like this:

{% highlight ruby %}
describe Gearbox do
  it 'initial state should be P' do
    should be_p
  end

  it '#switch_to_r changes level to R from P and N' do
    subject.gear = 'P'
    expect { subject.switch_to_r }.to change(subject, :gear).from('P').to('R')

    subject.gear = 'N'
    expect { subject.switch_to_r }.to change(subject, :gear).from('N').to('R')
  end

  it '#switch_to_n changes level to N from R and D' do
    subject.gear = 'R'
    expect { subject.switch_to_n }.to change(subject, :gear).from('R').to('N')

    subject.gear = 'D'
    expect { subject.switch_to_n }.to change(subject, :gear).from('D').to('N')
  end

  it '#switch_to_d changes level to D from N' do
    subject.gear = 'N'
    expect { subject.switch_to_d }.to change(subject, :gear).from('N').to('D')
  end

  it '#switch_to_p changes level to P from R' do
    subject.gear = 'R'
    expect { subject.switch_to_p }.to change(subject, :gear).from('R').to('P')
  end
end
{% endhighlight %}

Not so much code, but it has some problems:

1. It's not readable, and it's very easy to miss a typo because of the many event method calls (switch_to_r, switch_to_d and so on).
It looks like we test a field changed by a method rather than the state machine's events and what they do.
2. We have to worry about how the state machine works: we set `gear` to the appropriate state for every test.
3. If we change a state name, we will have to fix ALL these tests.
4. If the `subject` doesn't have the appropriate state, a test will fail.

I used this approach until now, but every time I had issues maintaining tests like the ones above. Eventually, I decided to invent a DSL that helps me get rid of these problems forever. Fortunately, I found a solution, and I'm going to share it with you in this post. I would also like to know your opinion about it.

## Use custom matcher

I hope you know that RSpec has a mechanism that allows you to [create your custom matchers](https://github.com/dchelimsky/rspec/wiki/Custom-Matchers). I'm inspired by how [shoulda-matchers](https://github.com/thoughtbot/shoulda-matchers) is written and how it helps test my Rails code. So I decided to create a matcher like those [shoulda-matchers](https://github.com/thoughtbot/shoulda-matchers) provides:

{% highlight ruby %}
RSpec::Matchers.define :have_transition do |transition|
  match do |model|
    transition = OpenStruct(transition)
    events = model.class.state_machines[transition.state_field].events
    event = events[transition.name]

    events.valid_for(model, :from => transition.from, :to => transition.to) == [event]
  end

  def OpenStruct(params)
    params.is_a?(OpenStruct) ? params : OpenStruct.new(params)
  end
end
{% endhighlight %}

Let's see how it can help us to test the given state flow:

{% highlight ruby %}
describe GearBox do
  context '#gear'
    let(:from_p_to_r) do
      OpenStruct.new({
        :state_field => :gear,
        :name => :switch_to_r,
        :from => :P,
        :to => :R
      })
    end

    let(:from_n_to_r) do
      OpenStruct.new({
        :state_field => :gear,
        :name => :switch_to_r,
        :from => :N,
        :to => :R
      })
    end

    let(:from_r_to_n) do
      OpenStruct.new({
        :state_field => :gear,
        :name => :switch_to_n,
        :from => :R,
        :to => :N
      })
    end

    let(:from_d_to_n) do
      OpenStruct.new({
        :state_field => :gear,
        :name => :switch_to_n,
        :from => :D,
        :to => :N
      })
    end

    let(:from_n_to_d) do
      OpenStruct.new({
        :state_field => :gear,
        :name => :switch_to_d,
        :from => :n,
        :to => :d
      })
    end

    let(:from_r_to_p) do
      OpenStruct.new({
        :state_field => :gear,
        :name => :switch_to_p,
        :from => :R,
        :to => :P
      })
    end

    it { should be_p } # check initial gear
    it { should have_transition from_p_to_r }
    it { should have_transition from_n_to_r }
    it { should have_transition from_r_to_n }
    it { should have_transition from_d_to_n }
    it { should have_transition from_n_to_d }
    it { should have_transition from_r_to_p }
  end
end
{% endhighlight %}

Obviously, we have much more code, but it's readable and maintainable. The tests say what they do without any description. If we change the state machine's field, all we have to do is change the tests' input data. By the way, we can move our input data (I mean all the lets) to a [shared example](https://www.relishapp.com/rspec/rspec-core/docs/example-groups/shared-examples). Then, if we had many classes with a similar state flow, we could use this shared example there.

## Conclusion

With this approach, I forgot my troubles with testing state machines and created a reusable solution that I will always use in my code from now on. I have an idea to create a gem for this, but I'm not sure it will be popular. If you like this solution, please let me know. Thank you for your attention!

I've created a [gist](https://gist.github.com/ka8725/6794542) for this solution.


UPDATE: I've invented a much simpler solution. It's easier and more elegant. Check [it out](https://gist.github.com/ka8725/7943510).
