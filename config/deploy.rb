# config valid only for current version and patch releases of Capistrano
lock "~> 3.19.1"

set :node_version, '14.21.3'
set :application, "bluelry"
set :repo_url, "git@github.com:ayoub-sourrakh/bluelry_react.git"

# Default environment path, including node path
set :default_env, {
  path: "/home/ubuntu/.nvm/versions/node/v#{fetch(:node_version)}/bin:$PATH"
}

set :deploy_to, '/var/www/bluelry_react'

# Persistent directories and files across deployments
append :linked_dirs, 'node_modules', 'log', 'public/system', 'tmp/cache', 'tmp/pids', 'tmp/sockets', 'vendor/bundle', 'public/build'

namespace :deploy do
    desc 'Install npm dependencies including react-scripts'
    task :prepare_environment do
      on roles(:app) do
        within release_path do
          # Installing dependencies with react-scripts explicitly
          execute :bash, "-l -c 'source ~/.nvm/nvm.sh && nvm use #{fetch(:node_version)} && npm install --production && npm install react-scripts@latest --save'"
        end
      end
    end
  
    desc 'Build React app'
    task :build_react do
      on roles(:app) do
        within release_path do
          execute :bash, "-l -c 'source ~/.nvm/nvm.sh && nvm use #{fetch(:node_version)} && npm run build'"
        end
      end
    end
  
    before 'deploy:build_react', 'deploy:prepare_environment'
  end

set :ssh_options, {
  forward_agent: true,
  auth_methods: %w[publickey],
  user: 'ubuntu'
}
