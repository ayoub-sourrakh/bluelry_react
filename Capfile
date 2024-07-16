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
        # Ensure NVM is loaded correctly and install npm dependencies
        execute :bash, '-lc', 'nvm use && npm install --production'
      end
    end
  end

  desc 'Build React app'
  task :build_react do
    on roles(:app) do
      within release_path do
        # Ensure NVM is loaded correctly and build React app
        execute :bash, '-lc', 'nvm use && npm run build'
      end
    end
  end

  # Ensure npm_install runs before build_react
  before 'deploy:build_react', 'deploy:npm_install'

  # Ensure build_react runs after npm_install and publishing
  after :published, 'deploy:build_react'
end
