
function version(link: string, versions: Array<string> ){

  import('zx').then( zx => {
    console.log('importou', zx);
  }).catch( err => {
    console.log('erro', err)
  })
  console.log(link)
  console.log(versions)

  
}
const description = "Teste";

export {
  version,
  description
}