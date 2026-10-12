---
layout: post
title: "Cascading selects with AJAX in Rails"
description: "This post describes a technique for populating a select based on the chosen value in another select. For example, a page has country and state selects: when I choose a country, the state select should be populated with its states."
tags: [coffeescript, rails, ajax]
share: true
comments: true
redirect_from:
  - /blog/2013/09/05/cascading-selects-with-ajax-in-rails/
---


I bet you have had an issue with dynamically populating a *select* that depends on the chosen value of another *select*. For example, when I choose a country, the state *select* should be populated with that country's states. There are many solutions to this problem. You can find them with Google, but none suited me because of bugs or approaches involving caching. I had this issue again and again, and my googling was unsuccessful. Eventually, some time ago, I created a jQuery library and an approach that solves this problem and completely suits me. This approach assumes that you don't use JavaScript frameworks like *Ember.js* or *Angular.js*. Otherwise, my solution may be unnecessary in your application.

## Problem

This image will clarify the problem without any words:

{% picture /images/select-car.png alt="Cascading select" %}

## Solution

The first thing I should draw attention to in my solution is a *jQuery* library:

> app/assets/javascripts/jquery-dynamic-selectable.coffee

{% highlight javascript %}
$.fn.extend
  dynamicSelectable: ->
    $(@).each (i, el) ->
      new DynamicSelectable($(el))

class DynamicSelectable
  constructor: ($select) ->
    @init($select)

  init: ($select) ->
    @urlTemplate = $select.data('dynamicSelectableUrl')
    @$targetSelect = $($select.data('dynamicSelectableTarget'))
    $select.on 'change', =>
      @clearTarget()
      url = @constructUrl($select.val())
      if url
        $.getJSON url, (data) =>
          $.each data, (index, el) =>
            @$targetSelect.append "<option value='#{el.id}'>#{el.name}</option>"
            # reinitialize target select
          @reinitializeTarget()
      else
        @reinitializeTarget()

  reinitializeTarget: ->
    @$targetSelect.trigger("change")

  clearTarget: ->
    @$targetSelect.html('<option></option>')

  constructUrl: (id) ->
    if id && id != ''
      @urlTemplate.replace(/:.+_id/, id)
{% endhighlight %}

This piece of code extends jQuery with a *dynamicSelectable* function that you can call on the *select* whose changes should trigger population of the dependent *select*. The watched *select* should have these data attributes: *selectable-url* and *selectable-target*. Their names explain what they are for:

*selectable-url* is a URL pattern with the model ID. For example: `/dynamic_select/:country_id/states`. In this case, the pattern should be populated with the chosen country ID (assuming that we add a listener to the country select), and a request will go to this URL to get JSON data for populating the related *select*.

*selectable-target* is a CSS selector for the *select* that should be populated with the JSON data received from the server.


I call the *dynamicSelectable* function for every *select* on the page that has both the *selectable-url* and *selectable-target* data attributes:

> app/assets/javascripts/application.coffee

{% highlight javascript %}
...
$ ->
  $('select[data-dynamic-selectable-url][data-dynamic-selectable-target]').dynamicSelectable()
{% endhighlight %}

To make our application work, we should have a controller responsible for the route `/dynamic_select/:country_id/states`. Firstly, have a look at how I generate the route:

> config/routes.rb

{% highlight ruby %}
...
namespace :dynamic_select do
  get ':country_id/states', to: 'states#index', as: 'states'
end
...
{% endhighlight %}

And this is how my controller looks:

> app/controllers/dynamic_select/states_controller.rb

{% highlight ruby %}
module DynamicSelect
  class StatesController < ApplicationController
    respond_to :json

    def index
      @states = State.where(:country_id => params[:country_id])
      respond_with(@states)
    end
  end
end
{% endhighlight %}

And this is a template for the *index action*:

> app/views/dynamic_select/states/index.json.jbuilder

{% highlight ruby %}
json.array!(@states) do |state|
  json.extract! state, :name, :id
end
{% endhighlight %}

The JSON data returned from the server should not include root elements:

> config/intializers/wrap_parameters.rb

{% highlight ruby %}
...
ActiveSupport.on_load(:active_record) do
 self.include_root_in_json = false
end
{% endhighlight %}

And the last thing I should focus on is the form:

{% highlight ruby %}
<div class="field">
  <%= f.label :country_id %><br>
  <%= f.collection_select :country_id, Country.all, :id, :name,
      {include_blank: true},
      { data: {
          dynamic_selectable_url: dynamic_select_states_path(':country_id'),
          dynamic_selectable_target: '#event_state_id'
        }
      } %>
</div>
<div class="field">
  <%= f.label :state_id %><br>
  <%= f.collection_select :state_id, @event.country.try(:states) || [], :id, :name, :include_blank => true  %>
</div>
{% endhighlight %}


Check out the [code on github](https://github.com/widefix/dynamic-selectable-demo) and the live [demo here](http://afternoon-lake-2182.herokuapp.com/events/new).

If you have any suggestions concerning this solution, or if you have spotted a typo, bug, inconsistency or gap, feel free to contact me.
