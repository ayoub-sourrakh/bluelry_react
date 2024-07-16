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
  desc 'Install npm dependencies'
  task :npm_install do
    on roles(:app) do
      within release_path do
        execute :bash, "-l -c 'source ~/.nvm/nvm.sh && nvm use #{fetch(:node_version)} && npm install --production'"
      end
    end
  end

  desc 'Build React app'
  task :build_react do
    on roles(:app) do
      within release_path do
        # Ensure that the command for building is correct
        execute :bash, "-l -c 'source ~/.nvm/nvm.sh && nvm use #{fetch(:node_version)} && npm run build'"
      end
    end
  end

  # Ensuring tasks are executed in the right order
  after 'deploy:npm_install', 'deploy:build_react'
end

after :publishing, 'deploy:npm_install'

set :ssh_options, {
  forward_agent: true,
  auth_methods: %w[publickey],
  user: 'ubuntu'
}
