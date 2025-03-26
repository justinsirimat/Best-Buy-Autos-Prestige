# Git Workflow Guide

This document outlines our Git workflow process for the car dealership website.

## Basic Workflow

1. **Pull the latest changes**
   ```bash
   git pull origin main
   ```

2. **Create a new branch for your feature or fix**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

3. **Make your changes and commit frequently**
   ```bash
   git add .
   git commit -m "Descriptive message about your changes"
   ```

4. **Push your branch to the remote repository**
   ```bash
   git push -u origin feature/your-feature-name
   ```

5. **Create a Pull Request** on GitHub/GitLab

6. **After approval, merge your branch** into main

## Commit Message Guidelines

Use clear, descriptive commit messages that explain why a change was made:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Formatting, missing semicolons, etc; no code change
- **refactor**: Refactoring production code
- **test**: Adding tests, refactoring tests; no production code change
- **chore**: Updating build tasks, package manager configs, etc; no production code change

Example:
```
feat: add search functionality to inventory page
```

## Branching Strategy

- `main` - Production-ready code
- `dev` - Development branch (optional for smaller projects)
- `feature/name` - New features
- `fix/name` - Bug fixes
- `hotfix/name` - Urgent fixes for production

## Tips

- Commit early and often
- Pull before you push to avoid merge conflicts
- Write descriptive commit messages
- Use branches for all new features and fixes
- Don't commit sensitive information (API keys, passwords)
- Don't commit large binary files or build artifacts

## Resolving Conflicts

If you encounter merge conflicts:

```bash
git pull origin main
# Resolve conflicts in your editor
git add .
git commit -m "Resolve merge conflicts"
git push
``` 