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
        # Load NVM and install npm dependencies
        execute :bash, '-lc', 'source $HOME/.nvm/nvm.sh && npm install --production'
      end
    end
  end

  desc 'Build React app'
  task :build_react do
    on roles(:app) do
      within release_path do
        # Load NVM and build React app
        execute :bash, '-lc', 'source $HOME/.nvm/nvm.sh && npm run build'
      end
    end
  end

  after :published, 'deploy:npm_install'  # Run npm install after publishing new release
  after :npm_install, 'deploy:build_react'  # Build React app after npm install
end
