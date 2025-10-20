# Contributing to Mentorify

Thank you for considering contributing to Mentorify! This document provides guidelines and instructions for contributing to this project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Bug Reports](#bug-reports)
- [Feature Requests](#feature-requests)

## 🤝 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in all interactions.

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
   ```bash
   git clone https://github.com/YOUR_USERNAME/mentorify.git
   cd mentorify
   ```
3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/mentorify.git
   ```
4. **Create a branch** for your changes
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 💻 Development Workflow

### Setting Up Development Environment

1. **Install Dependencies**
   ```bash
   # Backend
   cd unified-server
   npm install

   # Frontend
   cd ../unified-client
   npm install
   ```

2. **Configure Environment**
   - Copy `env.example` to `.env` in both directories
   - Update configuration as needed

3. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend
   cd unified-server
   npm run dev

   # Terminal 2 - Frontend
   cd unified-client
   npm start
   ```

### Making Changes

1. **Keep your fork synced**
   ```bash
   git fetch upstream
   git merge upstream/main
   ```

2. **Make your changes** in your feature branch

3. **Test your changes** thoroughly
   - Run existing tests
   - Add new tests for new features
   - Manually test in the browser

4. **Commit your changes** following our commit guidelines

## 📝 Coding Standards

### JavaScript/React

- Use **ES6+ syntax** (arrow functions, destructuring, etc.)
- Use **functional components** with hooks in React
- Follow **camelCase** for variables and functions
- Follow **PascalCase** for React components
- Use **meaningful variable names**
- Add **comments** for complex logic
- Keep functions **small and focused**

### Example:
```javascript
// Good
const getUserData = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Bad
function g(i) {
  return api.get('/users/' + i);
}
```

### File Organization

- One component per file
- Keep files under 300 lines when possible
- Group related files in folders
- Use index.js for folder exports

### CSS

- Use component-specific CSS files
- Follow **kebab-case** for class names
- Use **meaningful class names**
- Avoid inline styles when possible
- Mobile-first responsive design

### Backend

- Use **async/await** for asynchronous operations
- Implement **proper error handling**
- Validate all **user inputs**
- Use **middleware** for reusable logic
- Follow **RESTful** API conventions
- Add **proper HTTP status codes**

## 📋 Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (formatting, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvement
- **test**: Adding or updating tests
- **chore**: Changes to build process or auxiliary tools

### Examples

```bash
feat(auth): add JWT token refresh mechanism

fix(dashboard): resolve chart rendering issue on mobile devices

docs(readme): update installation instructions

refactor(api): simplify user authentication logic
```

### Best Practices

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- First line should be 50 characters or less
- Separate subject from body with a blank line
- Wrap body at 72 characters
- Reference issues and pull requests in footer

## 🔄 Pull Request Process

1. **Update documentation** if needed
   - Update README.md
   - Add JSDoc comments
   - Update API documentation

2. **Ensure all tests pass**
   ```bash
   npm test
   ```

3. **Update the CHANGELOG** (if applicable)

4. **Create Pull Request**
   - Use a clear, descriptive title
   - Reference related issues
   - Provide detailed description of changes
   - Include screenshots for UI changes
   - List any breaking changes

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe testing done

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests passing
```

5. **Address review comments** promptly

6. **Squash commits** if requested

## 🐛 Bug Reports

### Before Submitting

- Check existing issues to avoid duplicates
- Test with the latest version
- Collect relevant information

### Bug Report Template

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
If applicable

## Environment
- OS: [e.g., macOS 12.0]
- Browser: [e.g., Chrome 96]
- Node Version: [e.g., 16.0]
- Version: [e.g., 1.0.0]

## Additional Context
Any other relevant information
```

## ✨ Feature Requests

### Feature Request Template

```markdown
## Feature Description
Clear description of the feature

## Problem it Solves
What problem does this feature address?

## Proposed Solution
How should this feature work?

## Alternatives Considered
Other solutions you've thought about

## Additional Context
Any other relevant information
```

## 🧪 Testing Guidelines

- Write tests for new features
- Update tests for bug fixes
- Aim for good code coverage
- Test edge cases
- Include both unit and integration tests

### Running Tests

```bash
# Frontend tests
cd unified-client
npm test

# Backend tests
cd unified-server
npm test
```

## 📚 Documentation

- Document all public APIs
- Add README for new modules
- Update existing documentation
- Include code examples
- Keep documentation in sync with code

## 🎯 Areas for Contribution

We welcome contributions in these areas:

- Bug fixes
- New features
- Documentation improvements
- Performance optimizations
- Test coverage
- UI/UX enhancements
- Accessibility improvements
- Security enhancements

## 💡 Questions?

If you have questions about contributing:

1. Check existing documentation
2. Search closed issues
3. Open a new issue with the "question" label
4. Contact the maintainers

## 🙏 Recognition

Contributors will be recognized in:
- Project README
- Release notes
- Contributors page

Thank you for contributing to Mentorify!

---

**Happy Coding!** 🚀

