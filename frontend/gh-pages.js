const ghpages = require('gh-pages');

ghpages.publish('build', {
  remote: 'hazel',

  repo: 'git@github.com:Hazelwu2/kcrypto-camp-final-project-team.git'
}, (error) => {
  console.log('finish deploy gf-pages to hazel')
  console.log(error)
});