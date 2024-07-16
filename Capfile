# Capfile

namespace :deploy do
    desc 'Install npm dependencies'
    task :npm_install do
      on roles(:app) do
        within release_path do
          # Source nvm and use the desired Node.js version
          execute :bash, '-lc', 'source $HOME/.nvm/nvm.sh && nvm use && npm install --production'
        end
      end
    end
  
    desc 'Build React app'
    task :build_react do
      on roles(:app) do
        within release_path do
          # Source nvm and use the desired Node.js version
          execute :bash, '-lc', 'source $HOME/.nvm/nvm.sh && nvm use && npm run build'
        end
      end
    end
  
    # Ensure npm_install runs before build_react
    before 'deploy:build_react', 'deploy:npm_install'
  
    # Ensure build_react runs after npm_install and publishing
    after :published, 'deploy:build_react'
  end
  