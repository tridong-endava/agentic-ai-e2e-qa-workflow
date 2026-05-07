# QA End-to-End Prompt File - AutomationExercise

This prompt file is designed for the End-to-End Agentic AI QA Workflow using AI Agents, Playwright MCP, Playwright Test, and Git.

Target application: https://automationexercise.com  
User story file: `user-stories/SCRUM-101-automationexercise-checkout.md`

---

## STEP 1: Read User Story

### Prompt

I need to start a new testing workflow. Please read the user story from the file:

`user-stories/SCRUM-101-automationexercise-checkout.md`

Summarize the key requirements, acceptance criteria, business rules, technical notes, and testing scope.

### Expected Output

- Summary of the user story
- List of acceptance criteria
- Application URL
- Test data and credentials
- Business rules
- Key features to test
- Testing scope
- Any assumptions or missing information

---

## STEP 2: Create Test Plan

### Prompt

Based on the user story `SCRUM-101` that we just reviewed, use the `playwright-test-planner` agent to create a comprehensive test plan.

Please do the following:

1. Read the application URL and test data from the user story.
2. Analyze all acceptance criteria.
3. Identify the complete checkout workflow for AutomationExercise.
4. Create a comprehensive test plan that covers:
   - Happy path scenarios
   - Negative scenarios
   - Form validation scenarios
   - Edge cases and boundary conditions
   - Navigation flow tests
   - Cart and checkout validation
   - Order confirmation validation
   - Invoice download validation
   - Account cleanup validation
5. Organize the test cases logically by feature area.
6. Save the test plan to:

`specs/automationexercise-checkout-test-plan.md`

### Expected Output

- Comprehensive test plan saved under `specs/`
- Test scenarios mapped to acceptance criteria
- Clear test steps and expected results
- Coverage for positive, negative, and edge cases

---

## STEP 3: Perform Exploratory Testing

### Prompt

Now I need to perform manual exploratory testing using Playwright MCP browser tools.

Please read the test plan from:

`specs/automationexercise-checkout-test-plan.md`

Then execute the test scenarios defined in that plan.

Use Playwright browser tools to manually execute each test scenario from the plan.

Please do the following:

1. Follow the step-by-step instructions in each test case.
2. Verify expected results match actual results.
3. Take screenshots at key steps and error states.
4. Document your findings:
   - Test execution results for each scenario
   - Any UI inconsistencies or unexpected behavior
   - Missing validations or bugs discovered
   - Screenshots as evidence
5. Save exploratory observations to:

`observations/automationexercise-checkout-observations.md`

### Expected Output

- Manual exploratory testing results
- Screenshots of the application at important states
- List of observations and findings
- Any issues discovered during exploration
- Useful locators or UI notes for automation

---

## STEP 4: Generate Automation Scripts

### Prompt

Now I need to create automated test scripts using the `playwright-test-generator` agent.

Please review:

1. Test plan from:
   `specs/automationexercise-checkout-test-plan.md`

2. Exploratory testing results from Step 3:
   `observations/automationexercise-checkout-observations.md`

Using insights from the manual exploratory testing:

- Leverage the element selectors and locators that were successfully used in Step 3.
- Use stable element properties such as roles, text, labels, placeholders, IDs, or data attributes where available.
- Apply wait strategies and UI behavior observed during manual testing.
- Incorporate any workarounds for UI quirks discovered.

Generate Playwright TypeScript automation scripts.

Please do the following:

1. Create scripts for each test scenario from the test plan.
2. Organize scripts into appropriate test suite files under:

`tests/automationexercise-checkout/`

3. Use the test case names and steps from the test plan.
4. Use reliable selectors and strategies from exploratory testing.
5. Create page objects if needed under:

`pages/`

### Requirements for all scripts

- Follow Playwright best practices.
- Use TypeScript.
- Use clear and descriptive test names.
- Include proper assertions using `expect()`.
- Use robust selectors.
- Avoid unnecessary hard waits.
- Add comments for complex steps.
- Use proper test hooks such as `beforeEach` and `afterEach` where useful.
- Configure for multiple browsers: Chromium, Firefox, and WebKit.
- Ensure generated scripts are clean, readable, and maintainable.

After generating the scripts, run the tests to verify they pass.

### Expected Output

- Test suite files created in:
  `tests/automationexercise-checkout/`
- Page objects created in:
  `pages/`
- Scripts using robust selectors discovered during exploratory testing
- All scripts follow Playwright best practices
- Initial test generation completed

---

## STEP 5: Execute and Heal Automation Tests

### Prompt

Now I need to execute the generated automation scripts and heal any failures using the `playwright-test-healer` agent.

Please do the following:

1. Run all automation scripts in:

`tests/automationexercise-checkout/`

2. Identify any failing tests.
3. For each failing test, use the `playwright-test-healer` agent to:
   - Analyze the failure, including locator issues, timing issues, assertion failures, and application errors.
   - Auto-heal the test by fixing selectors, adding waits, or adjusting assertions.
   - Update the test script with the fix.
4. Re-run the healed tests to verify they pass.
5. Repeat the heal process until all tests are stable and passing.
6. Document:
   - Initial test results, including pass/fail count
   - Healing activities performed
   - Final test results after healing
   - Any tests that could not be auto-healed

### Expected Output

- All automation tests executed
- Failing tests identified and healed using the test-healer agent
- Healed test scripts updated in:
  `tests/automationexercise-checkout/`
- Final stable test execution results
- Summary of healing activities performed

---

## STEP 6: Create Test Report

### Prompt

Now I need to create a comprehensive test execution report based on manual testing, automation execution, and healing activities.

Please compile results from:

- Step 2: Test plan
- Step 3: Manual exploratory testing results
- Step 4: Generated automation scripts
- Step 5: Automated test execution and healing results

Structure the report as:

`test-results/SCRUM-101-checkout-test-report.md`

Include the following sections:

### 1. Executive Summary

- Total test cases planned
- Test cases executed manually
- Test cases automated
- Overall Pass/Fail/Blocked status

### 2. Manual Test Results

- Results from Step 3 exploratory testing
- Screenshots and observations
- Issues found during manual testing

### 3. Automated Test Results

- Initial automation results from Step 5
- Healing activities performed
- Final test execution results after healing
- Test suite execution summary
- Pass/Fail count for each test suite

### 4. Defects Log

For any failed tests, manual or automated, include:

- Bug ID
- Title
- Severity: Critical, High, Medium, or Low
- Steps to reproduce
- Expected result
- Actual result
- Screenshot or evidence
- Current status

### 5. Coverage Summary

- Acceptance criteria covered
- Acceptance criteria not covered
- Risks or gaps

### 6. Recommendations

- Suggested improvements
- Automation maintenance notes
- Follow-up testing needed

### Expected Output

- Comprehensive test execution report covering both manual and automated testing
- Clear PASS/FAIL status for all test scenarios
- Detailed bug reports for failures
- Complete test coverage analysis
- Evidence and screenshots attached or referenced

---

## STEP 7: Commit to Git Repository

### Git Repository URL

Add your repository URL here:

`https://github.com/tridong-endava/agentic-ai-e2e-qa-workflow.git`

### Prompt

Now I need to commit all test artifacts to the Git repository.

Please perform the following Git operations:

1. Initialize Git repository if not already initialized.

2. Stage all files in the workspace:
   - All new files
   - All modified files

3. Create a commit with the message:

`feat(tests): add complete test suite for SCRUM-101 AutomationExercise checkout workflow`

Commit description:

- Add user story documentation
- Add comprehensive test plan with all scenarios
- Add exploratory testing results
- Add automated test scripts for checkout process
- Add test execution report with results
- Include validation, navigation, and edge case tests
- Include healing updates where applicable

4. Push all changes to the Git repository.

5. Provide a summary of what was committed.

### Expected Output

- All workspace files committed to Git
- Descriptive commit message following conventional commit format
- Confirmation of successful push to the repository
- Summary of changes committed

---

## Complete Workflow Execution

### Single Combined Prompt

Use this only after all setup is ready.

I need to execute the complete end-to-end agentic QA workflow for AutomationExercise.

Please follow all steps in `QAEnd2EndPromptFile.md`:

1. Read the user story:
   `user-stories/SCRUM-101-automationexercise-checkout.md`

2. Create a test plan:
   `specs/automationexercise-checkout-test-plan.md`

3. Perform exploratory testing using Playwright MCP.

4. Generate Playwright TypeScript automation scripts.

5. Execute and heal automation tests.

6. Generate test report:
   `test-results/SCRUM-101-checkout-test-report.md`

7. Commit all QA artifacts to Git.

Please execute the workflow step by step and confirm the output of each step before moving to the next one.