const validateBranchWorkflow = require('../validate-workflow')

describe('validate-workflow', () => {
  let masterBranch
  let developBranch
  let featureBranch
  let fixBranch
  let hotfixBranch
  let releaseBranch
  let backportBranch
  let orphanBranch

  beforeEach(() => {
    masterBranch = 'master'
    developBranch = 'develop'
    featureBranch = 'feature/CPP-3000-some-relevant-task'
    hotfixBranch = 'hotfix/CPP-3000-some-important-hotfix'
    backportBranch = 'backport/master-12234332'
    releaseBranch = 'release/1.25.2'
    fixBranch = 'fix/CPP-3000-some-relevant-fix'
    orphanBranch = 'some-orphan-branch'
  })

  describe('targeting master', () => {
    it('should return true on target master and current hotfix/XXX-XXX-XXX', () => {
      const result = validateBranchWorkflow(masterBranch, hotfixBranch)
      expect(result).toBeTruthy()
    })

    it('should return false on target master and current feature/XXX-XXX-XXX', () => {
      const result = validateBranchWorkflow(masterBranch, featureBranch)
      expect(result).toBeFalsy()
    })

    it('should return true on target master and current release/XXX-XXX-XXX', () => {
      const result = validateBranchWorkflow(masterBranch, releaseBranch)
      expect(result).toBeTruthy()
    })

    it('should return false on target master and current fix/XXX-XXX-XXX', () => {
      const result = validateBranchWorkflow(masterBranch, fixBranch)
      expect(result).toBeFalsy()
    })

    it('should return false on target master and current backport/XXX-XXX-XXX', () => {
      const result = validateBranchWorkflow(masterBranch, backportBranch)
      expect(result).toBeFalsy()
    })

    it('should return false on target master and current develop', () => {
      const result = validateBranchWorkflow(masterBranch, developBranch)
      expect(result).toBeFalsy()
    })

    it('should return false on target master and current develop', () => {
      const result = validateBranchWorkflow(masterBranch, developBranch)
      expect(result).toBeFalsy()
    })

    it('should return false on target master and current orphan', () => {
      const result = validateBranchWorkflow(masterBranch, orphanBranch)
      expect(result).toBeFalsy()
    })
  })

  describe('targeting develop', () => {
    it('should return true on target develop and current backport/XXX-XXX-XXX', () => {
      const result = validateBranchWorkflow(developBranch, backportBranch)
      expect(result).toBeTruthy()
    })

    it('should return true on target develop and current fix/XXX-XXX-XXX', () => {
      const result = validateBranchWorkflow(developBranch, fixBranch)
      expect(result).toBeTruthy()
    })

    it('should return true on target develop and current feature/XXX-XXX-XXX', () => {
      const result = validateBranchWorkflow(developBranch, featureBranch)
      expect(result).toBeTruthy()
    })

    it('should return false on target develop and current master', () => {
      const result = validateBranchWorkflow(developBranch, masterBranch)
      expect(result).toBeFalsy()
    })

    it('should return false on target develop and current orphan', () => {
      const result = validateBranchWorkflow(developBranch, orphanBranch)
      expect(result).toBeFalsy()
    })

    it('should return false on target develop and current release/XXX-XXX-XXX', () => {
      const result = validateBranchWorkflow(developBranch, releaseBranch)
      expect(result).toBeFalsy()
    })

    it('should return false on target develop and current hotfix/XXX-XXX-XXX', () => {
      const result = validateBranchWorkflow(developBranch, hotfixBranch)
      expect(result).toBeFalsy()
    })
  })

  describe('targeting release', () => {
    it('should return false on target release/XXX-XXX-XXX and current backport/XXX-XXX-XXX', () => {
      const result = validateBranchWorkflow(releaseBranch, backportBranch)
      expect(result).toBeFalsy()
    })

    it('should return true on target release/XXX-XXX-XXX and current fix/XXX-XXX-XXX', () => {
      const result = validateBranchWorkflow(releaseBranch, fixBranch)
      expect(result).toBeTruthy()
    })

    it('should return false on target release/XXX-XXX-XXX and current feature/XXX-XXX-XXX', () => {
      const result = validateBranchWorkflow(releaseBranch, featureBranch)
      expect(result).toBeFalsy()
    })

    it('should return false on target release/XXX-XXX-XXX and current master', () => {
      const result = validateBranchWorkflow(releaseBranch, masterBranch)
      expect(result).toBeFalsy()
    })

    it('should return false on target release/XXX-XXX-XXX and current develop', () => {
      const result = validateBranchWorkflow(releaseBranch, developBranch)
      expect(result).toBeFalsy()
    })

    it('should return false on target release/XXX-XXX-XXX and current orphan', () => {
      const result = validateBranchWorkflow(releaseBranch, orphanBranch)
      expect(result).toBeFalsy()
    })

    it('should return false on target release/XXX-XXX-XXX and current release/XXX-XXX-XXX', () => {
      const result = validateBranchWorkflow(releaseBranch, releaseBranch)
      expect(result).toBeFalsy()
    })

    it('should return false on target release/XXX-XXX-XXX and current hotfix/XXX-XXX-XXX', () => {
      const result = validateBranchWorkflow(developBranch, hotfixBranch)
      expect(result).toBeFalsy()
    })
  })

  describe('targeting feature', () => {
    it('should return true on target feature/XXX-XXX-XXX and current backport/XXX-XXX-XXX', () => {
      const result = validateBranchWorkflow(featureBranch, backportBranch)
      expect(result).toBeFalsy()
    })

    it('should return true on target feature/XXX-XXX-XXX and current fix/XXX-XXX-XXX', () => {
      const result = validateBranchWorkflow(featureBranch, fixBranch)
      expect(result).toBeTruthy()
    })

    it('should return true on target feature/XXX-XXX-XXX and current feature/XXX-XXX-XXX', () => {
      const result = validateBranchWorkflow(featureBranch, featureBranch)
      expect(result).toBeTruthy()
    })

    it('should return true on target feature/XXX-XXX-XXX and current master', () => {
      const result = validateBranchWorkflow(featureBranch, masterBranch)
      expect(result).toBeTruthy()
    })

    it('should return true on target feature/XXX-XXX-XXX and current develop', () => {
      const result = validateBranchWorkflow(featureBranch, developBranch)
      expect(result).toBeTruthy()
    })

    it('should return false on target feature/XXX-XXX-XXX and current orphan', () => {
      const result = validateBranchWorkflow(featureBranch, orphanBranch)
      expect(result).toBeFalsy()
    })

    it('should return true on target feature/XXX-XXX-XXX and current release/XXX-XXX-XXX', () => {
      const result = validateBranchWorkflow(featureBranch, releaseBranch)
      expect(result).toBeTruthy()
    })

    it('should return false on target feature/XXX-XXX-XXX and current hotfix/XXX-XXX-XXX', () => {
      const result = validateBranchWorkflow(featureBranch, hotfixBranch)
      expect(result).toBeTruthy()
    })
  })

  describe('targeting hotfix', () => {
    it('should return true on target hotfix/XXX-XXX-XXX and current backport/XXX-XXX-XXX', () => {
      const result = validateBranchWorkflow(hotfixBranch, backportBranch)
      expect(result).toBeFalsy()
    })

    it('should return true on target hotfix/XXX-XXX-XXX and current fix/XXX-XXX-XXX', () => {
      const result = validateBranchWorkflow(hotfixBranch, fixBranch)
      expect(result).toBeTruthy()
    })

    it('should return true on target hotfix/XXX-XXX-XXX and current feature/XXX-XXX-XXX', () => {
      const result = validateBranchWorkflow(hotfixBranch, featureBranch)
      expect(result).toBeTruthy()
    })

    it('should return true on target hotfix/XXX-XXX-XXX and current master', () => {
      const result = validateBranchWorkflow(hotfixBranch, masterBranch)
      expect(result).toBeTruthy()
    })

    it('should return true on target hotfix/XXX-XXX-XXX and current develop', () => {
      const result = validateBranchWorkflow(hotfixBranch, developBranch)
      expect(result).toBeTruthy()
    })

    it('should return false on target hotfix/XXX-XXX-XXX and current orphan', () => {
      const result = validateBranchWorkflow(hotfixBranch, orphanBranch)
      expect(result).toBeFalsy()
    })

    it('should return true on target hotfix/XXX-XXX-XXX and current release/XXX-XXX-XXX', () => {
      const result = validateBranchWorkflow(hotfixBranch, releaseBranch)
      expect(result).toBeTruthy()
    })

    it('should return true on target hotfix/XXX-XXX-XXX and current hotfix/XXX-XXX-XXX', () => {
      const result = validateBranchWorkflow(hotfixBranch, hotfixBranch)
      expect(result).toBeTruthy()
    })
  })

  describe('targeting orphan', () => {
    it('should return false on target orphan and current backport/XXX-XXX-XXX', () => {
      const result = validateBranchWorkflow(hotfixBranch, backportBranch)
      expect(result).toBeFalsy()
    })

    it('should return false on target orphan and current fix/XXX-XXX-XXX', () => {
      const result = validateBranchWorkflow(orphanBranch, fixBranch)
      expect(result).toBeFalsy()
    })

    it('should return false on target orphan and current feature/XXX-XXX-XXX', () => {
      const result = validateBranchWorkflow(orphanBranch, featureBranch)
      expect(result).toBeFalsy()
    })

    it('should return false on target orphan and current master', () => {
      const result = validateBranchWorkflow(orphanBranch, masterBranch)
      expect(result).toBeFalsy()
    })

    it('should return false on target orphan and current develop', () => {
      const result = validateBranchWorkflow(orphanBranch, developBranch)
      expect(result).toBeFalsy()
    })

    it('should return false on target orphan and current orphan', () => {
      const result = validateBranchWorkflow(orphanBranch, orphanBranch)
      expect(result).toBeFalsy()
    })

    it('should return false on target orphan and current release/XXX-XXX-XXX', () => {
      const result = validateBranchWorkflow(orphanBranch, releaseBranch)
      expect(result).toBeFalsy()
    })

    it('should return false on target orphan and current hotfix/XXX-XXX-XXX', () => {
      const result = validateBranchWorkflow(orphanBranch, hotfixBranch)
      expect(result).toBeFalsy()
    })
  })
})
