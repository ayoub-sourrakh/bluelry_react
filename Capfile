# Load DSL and set up stages
require "capistrano/setup"

# Include default deployment tasks
require "capistrano/deploy"

# Load the SCM plugin (Git in this case)
require "capistrano/scm/git"
install_plugin Capistrano::SCM::Git

# Configuration des tâches de déploiement
namespace :deploy do
  desc 'Install npm dependencies'
  task :npm_install do
    on roles(:app) do
      within release_path do
        # Source nvm and use the desired Node.js version, then npm install
        execute :bash, '-lc', 'source $HOME/.nvm/nvm.sh && nvm use && npm install --production'
      end
    end
  end

  desc 'Build React app'
  task :build_react do
    on roles(:app) do
      within release_path do
        # Source nvm and use the desired Node.js version, then npm run build
        execute :bash, '-lc', 'source $HOME/.nvm/nvm.sh && nvm use && npm run build'
      end
    end
  end

  # Ensure npm_install runs before build_react
  before 'deploy:build_react', 'deploy:npm_install'

  # Hook build_react after deployment is finished
  after :finished, 'deploy:build_react'
end
