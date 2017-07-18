// Client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(() => {
   console.log('hello world :o')

   $.get('/dreams', dreams => {
      dreams.forEach(dream => {
         $('<li></li>').text(dream).appendTo('ul#dreams')
      })
   })

   $('form').submit(event => {
      event.preventDefault()
      const dream = $('input').val()
      $.post('/dreams?' + $.param({dream}), () => {
         $('<li></li>').text(dream).appendTo('ul#dreams')
         $('input').val('')
         $('input').focus()
      })
   })
})
