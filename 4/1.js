// 1. Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки. Придумать шаблон, который заменяет одинарные кавычки на двойные.
'use strict';


fetch("texttoreplace.txt")
	.then(response => response.text())
	.then(text => console.log(text.replace(/'/g, '"')))
