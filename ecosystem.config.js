module.exports = {
  apps : [{
    name: 'blog-backend',
    script: './bin/www',
    watch: true,
        "ignore_watch":[
            "node_modules",
            "logs"
        ],
    instances: 2,
    error_file: "logs/err.log",
    out_file: "logs/out.log",
    log_date_format: "YYYY-MM-DD HH:mm:ss",
    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    autorestart: true,
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
