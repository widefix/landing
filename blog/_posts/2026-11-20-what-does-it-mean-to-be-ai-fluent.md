---
layout: post
title: "What does it mean to be AI fluent? A Black Friday example"
description: "A one-day Black Friday checkout change showed me how developers can use AI for a first draft and apply their product knowledge to verify what customers experience."
tags: [ai, software-development, technical-ownership]
featured_post: false
image: ai-fluency-checkout.svg
image_svg: ai-fluency-checkout.svg
---

It hurts to hear that you’re moving too slowly when you’re doing the careful work your team has always counted on. And when AI can draft in minutes what used to take you hours, it’s easy to wonder where your experience fits.

A Black Friday deadline gave me a concrete answer. A founder wanted to update signup and checkout for a promotion. We had one day and one part-time developer. I’d estimated three or four days using our usual approach.

The developer had worked on both pages and knew how customers moved from signup to payment. I suggested giving AI the requirements and asking it to draft the changes. The developer walked through the flows by hand, reviewed the pull request, and ran the automated checks. We finished that day.

What made the first draft useful was that the developer already knew where to look for mistakes. A checkout page can look right and still charge full price after signup shows a discount.

## Ask what you’re doing and why

To me, the most universal questions are also the most abstract. **What am I doing? Why am I doing it?** I ask them of myself first. On Black Friday, “we’re updating signup and checkout” named the work. Asking why made the intent clearer. We wanted customers who signed up for the promotion to get the price we offered them. That gave us a way to judge the draft.

I think of this as part of what Donald Schön calls reflection-in-action. He describes how professionals examine what they’re doing and adjust their approach as they work. It’s a way to bring some of the judgment you’ve picked up through experience into the open. [Donald Schön’s *The Reflective Practitioner*](https://www.routledge.com/The-Reflective-Practitioner-How-Professionals-Think-in-Action-1st-Edition/Schn/p/book/9781857423198).

I’d keep asking why if a check failed, too. If a test payment came through at full price, I’d ask why the charge differed from the offer, then trace whether checkout received the discount and applied it when calculating the charge. Each answer should come from something I can check and give me somewhere to look next. That’s the idea behind the Five Whys, the method Taiichi Ohno describes for tracing a problem back from its visible symptom. [Taiichi Ohno’s *Toyota Production System*](https://www.routledge.com/Toyota-Production-System-Beyond-Large-ScaleProduction/Ohno/p/book/9780915299140) and the [Lean Enterprise Institute’s Five Whys example](https://www.lean.org/lexicon-terms/5-whys/).

## Start with what could go wrong for the customer

Once you’ve put the purpose into words, ask one more question before you hand the task to AI. **What could go wrong for a customer after this change?**

For the Black Friday promotion, I’d put this condition in the task itself.

> The amount the customer pays must match the offer they saw at signup.

Once you have a draft, follow the same path a customer would. In this case, go through signup with the offer, complete a test payment, and compare the amount actually charged with the amount shown at signup. Look for an automated check that covers the same path. Writing the condition in the pull request gives the next reviewer something concrete to verify, too.

That’s what AI fluency looks like to me. You can give AI a task in terms that matter to the customer, then use your knowledge of the product to judge whether the result works. Writing that condition down also makes your experience visible to the rest of the team.

At WideFix, we take technical ownership of existing Ruby on Rails applications and maintain them over time. When we inherit an app, a rule like this helps us learn which parts of the customer journey the business depends on. If you’re handing over a Rails app, pick one workflow and write down what a customer should be able to count on. Bring it to your first conversation with the team taking over. [See how WideFix approaches a Rails application takeover](/ruby-on-rails-application-takeover).
