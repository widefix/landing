---
layout: post
title: "Parse CSV with column names"
description: "There is a convenient and robust way to parse CSV in Ruby instead of using column indexes. If your CSV has a header as the first row, you can use it in your code."
tags: [ruby]
share: true
comments: true
redirect_from:
  - /blog/2013/04/29/parse-csv-with-column-names/
---


Say you have a CSV file with a header as the first row. It contains column names, and you have to parse it. I have often seen code that solves this problem but isn't as convenient and reliable as I wanted. The solution was unreliable and unmaintainable because it used hard-coded column indexes: 0, 1, 2, and so on. I decided to figure out how to use the provided column names instead of numeric indexes. So welcome aboard.

# Simple solution

Let's say we have this CSV:

{% highlight ruby %}
Make; Model; Year
Audi; 80; 1994
Audi; A6; 2005
BMW; 740; 2001
{% endhighlight %}

The simplest solution, with some disadvantages, will look like this:

{% highlight ruby %}
CSV.foreach(file_path, :headers => true, :col_sep => ';') do |row|
  Car.create(:make => row[0], :model => row[1], :year => row[2])
end
{% endhighlight %}

The disadvantages of this solution are obvious: if the column order changes, the system will behave incorrectly and fail.

# Robust solution

See how simple it is to write more reliable code that solves this problem:

{% highlight ruby %}
CSV.foreach(file_path, :headers => true, :col_sep => ';') do |row|
  Car.create(:make => row['Make'], :model => row['Model'], :year => row['Year'])
end
{% endhighlight %}

Note that you cannot get row values using symbols corresponding to the original strings (:Make, :Model or :Year), or even using underscored strings/symbols ('make' or :make). To achieve this, you should make a monkey patch that resolves the problem. I won't provide it here — it's up to you.

This solution is more reliable — it's ready for changes in column order, it's readable for humans, and it's not sensitive to the number of columns. But there is still a possible failure: if there is a mistake in the CSV header, this solution will fail too. In this case, I can give only one piece of advice: check the header and read the column names before parsing. The `CSV.foreach` method accepts more parameters; you can find them [here](http://ruby-doc.org/stdlib-1.9.3/libdoc/csv/rdoc/CSV.html).

PS. At first, I reinvented the wheel with code that reads the first row and creates a hash of indexes for each column (an underscored symbol of the column name as the key and the index number as the value), but [@avsej](http://github.com/avsej) suggested this solution to me. Although I didn't find the solution in examples or official docs, I've learned one more lesson here — don't reinvent the wheel. Thanks to [@avsej](http://github.com/avsej)!
