# Pull Request Gitflow validator action

This action validates the target and source branch to follow gitflow workflow

![Gitflow workflow](https://2.bp.blogspot.com/-vDwo40we11Y/XTsNCRhz_gI/AAAAAAAABNo/kplk7d7RCK4kOk674vuGN0Dz3IwkmNNAQCLcBGAs/s1600/gitflow_1.png)

## Example usage

```yml
on:
  pull_request:
    types: [opened, synchronize, reopened]
name: Continous Integration
jobs:
  gitflow:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Gitflow validation
        uses: wsantos-conekta/pull-request-gitflow@master

```
