| - | .env | docker-env_file | docker-env_injected | docker_compose-env_file | docker_compose-env_injected | docker_compose-injected | dotenv |
| - | - | - | - | - | - | - | - |
| STR_DIRECT | direct | direct | direct | direct | direct | direct | direct |
| STR_SINGLE | 'single' | 'single' | single | single | single | 'single' | single |
| STR_DOUBLE | "double" | "double" | double | double | double | "double" | double |
| STR_BACKTICK | \`backtick\` | \`backtick\` | \`backtick\` | \`backtick\` | \`backtick\` | \`backtick\` | \`backtick\` |
| STR_EMPTY |  |  |  |  |  |  |  |
| VAR | "Variable" | VAR | VAR | VAR | VAR | VAR | Variable |
| VAR_DIRECT | $VAR | $VAR | Variable | $VAR | Variable |  | $VAR |
| VAR_SINGLE | '$VAR' | '$VAR' | $VAR | $VAR | $VAR | '' | $VAR |
| VAR_DOUBLE | ${VAR}${VAR} | ${VAR}${VAR} | VariableVariable | VariableVariable | VariableVariable |  | ${VAR}${VAR} |
| VAR_BACKTICK | \`$VAR\` | \`$VAR\` | \`Variable\` | \`$VAR\` | \`Variable\` | \`\` | \`$VAR\` |
| VAR_CURVE | ${VAR} | ${VAR} | Variable | Variable | Variable |  | ${VAR} |
| VAR_CURVE_DOUBLE | "${VAR}" | "${VAR}" | Variable | Variable | Variable | "" | ${VAR} |
| VAR_BRACKETS | ($VAR) | ($VAR) | (Variable) | ($VAR) | (Variable) | () | ($VAR) |
| VAR_SETTED1 | ${XXX:-$VAR} | ${XXX:-$VAR} | Variable | $VAR | Variable | $VAR | ${XXX:-$VAR} |
| VAR_SETTED2 | ${STR_EMPTY:-$VAR} | ${STR_EMPTY:-$VAR} | Variable |  | Variable | $VAR | ${STR_EMPTY:-$VAR} |
| VAR_DEFAULT_DEFAULT | ${XXX:-${YYY:-VAR}} | ${XXX:-${YYY:-VAR}} | VAR | ${YYY:-VAR} | VAR | ${YYY:-VAR} | ${XXX:-${YYY:-VAR}} |