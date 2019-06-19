module.exports = {
  apps : [{
    name: 'blog-backend',
    script: './bin/www',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'alex',
      host : '47.106.34.113',
      ref  : 'origin/master',
      repo : 'git@github.com:Alexbyy/blog.git',
      path : '/home/alex/www/koa2',
      'post-deploy' : 'npm install && npm run prd',
      "env"  : {
        "NODE_ENV": "production"
      }
    }
  }
};
