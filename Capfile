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
        # Load NVM
        execute :source, '$HOME/.nvm/nvm.sh'
        execute :source, '$HOME/.nvm/bash_completion'

        # Install npm dependencies
        execute :npm, 'install --production'
      end
    end
  end

  desc 'Build React app'
  task :build_react do
    on roles(:app) do
      within release_path do
        # Load NVM
        execute :source, '$HOME/.nvm/nvm.sh'
        execute :source, '$HOME/.nvm/bash_completion'

        # Build React app
        execute :npm, 'run build'
      end
    end
  end

  after :publishing, 'deploy:npm_install'
  after :npm_install, 'deploy:build_react'
end
