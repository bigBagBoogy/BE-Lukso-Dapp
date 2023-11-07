#!/bin/bash

# Load NVM and use the Node.js version
source /home/maarten/.nvm/nvm.sh # Replace with the actual path to your nvm.sh file
nvm use 16.0.0

# Run your deployUP script
node deployUP.js

