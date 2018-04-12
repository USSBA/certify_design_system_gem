# Contributing

General guidance for contributing, including information on how to propose new patterns and coding guidelines can be found in the [wiki](https://github.com/USSBA/certify_design_system_gem/wiki). All contributions are subject to the license for the appropriate section and in no way imply compensation for contributions.

## Feedback

To provide feedback on the code, please create an issue on GitHub. 
For other issues, please contact the [Certify Help Desk](mailto:help@certify.sba.gov).

## How to Contribute

To contribute, simple create a pull request:

1. Fork this repository
2. Create a feature branch on which to work (`git checkout -b my-new-feature`)
3. Commit your work (we like commits that explain your thought process)
4. Submit a pull request
5. If there is an issue associated with your pull request, then link that issue.

For documentation changes, use the [Certify Design System Documentation Site](https://ussba.github.io/certify-design-system-documentation/).

## Tests

Contributions should include appropriate tests or updated tests.

To run [Poirot](https://github.com/emanuelfeld/poirot) to check commits for sensitive information run:

`poirot --patterns test/poirot-patterns.txt --revlist="develop^..HEAD"`


