// 2.Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.
'use strict';


fetch("texttoreplace.txt")
	.then(response => response.text())
	.then(text => console.log(text.replace(/\B'/g, '"')))
