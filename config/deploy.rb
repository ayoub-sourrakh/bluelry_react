# config valid for current version and patch releases of Capistrano
lock "~> 3.19.1"
set :node_version, '14.21.3'

set :application, "bluelry"
set :repo_url, "git@github.com:ayoub-sourrakh/bluelry_react.git"

# Définition du chemin par défaut, y compris le chemin de node
set :default_env, {
path: "/home/ubuntu/.nvm/versions/node/v#{fetch(:node_version)}/bin:$PATH"
}

set :deploy_to, '/var/www/bluelry_react'

# Liens vers des dossiers qui doivent être persistants entre les déploiements
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
    
    desc 'Force reinstall react-scripts and build React app'
    task :build_react do
        on roles(:app) do
            within release_path do
                # Assurez-vous que react-scripts est installé
                execute :bash, "-l -c 'source ~/.nvm/nvm.sh && nvm use #{fetch(:node_version)} && npm install react-scripts@latest && npm run build'"
            end
        end
    end
    
    after :publishing, :build_react
end


set :ssh_options, {
forward_agent: true,
auth_methods: %w[publickey],
user: 'ubuntu'
}
