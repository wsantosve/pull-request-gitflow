function validateBranchWorkflow (targetBranch, sourceBranch) {
  const pattern = [
    { target: /^master$/g, source: /^(hotfix|release)\/.+$/g },
    { target: /^develop$/g, source: /^(feature|fix|backport)\/.+$/g },
    { target: /^release\/.+$/g, source: /^fix\/.+$/g },
    { target: /^(feature|hotfix|fix)\/.+$/g, source: /^(master|develop)$|^(feature|fix|hotfix|release)\/.+$/g }
  ].find(({ target }) => target.test(targetBranch))
  if (!pattern) {
    return false
  }
  const { source: sourceExp } = pattern
  return sourceExp.test(sourceBranch)
}

module.exports = validateBranchWorkflow
