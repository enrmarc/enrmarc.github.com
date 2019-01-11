#!/usr/bin/env bash

old="$IFS"
IFS="-"
curr_date="`date +%Y-%m-%d`"
post_title=$*
filename="_posts/${curr_date}-${post_title}.md"

cat > "$filename" << EOF
---
layout      : post
title       : 
summary     : 
category    : 
permalink   : /blog/${post_title}
disqus      : false
keywords    : 
---


EOF

echo "$filename created"