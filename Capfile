# Load DSL and set up stages
require "capistrano/setup"

# Include default deployment tasks
require "capistrano/deploy"

# Load the SCM plugin (Git in this case)
require "capistrano/scm/git"
install_plugin Capistrano::SCM::Git

before 'deploy:npm_install', 'nvm:load'

namespace :nvm do
  task :load do
    on roles(:all) do
      execute 'export NVM_DIR="$HOME/.nvm"'
      execute '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"'
      execute '[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"'
    end
  end
end

namespace :deploy do
    desc 'Install npm packages'
    task :npm_install do
      on roles(:all) do
        within release_path do
          execute '/home/ubuntu/.nvm/versions/node/v22.4.1/bin/npm install --production'
        end
      end
    end
  end

# Configuration des tâches de déploiement
namespace :deploy do
  desc 'Install npm dependencies'
  task :npm_install do
    on roles(:app) do
      within release_path do
        execute :npm, 'install --production'
      end
    end
  end

  desc 'Build React app'
  task :build_react do
    on roles(:app) do
      within release_path do
        execute :npm, 'run build'
      end
    end
  end

  after :publishing, 'deploy:npm_install'
  after :npm_install, 'deploy:build_react'
end
