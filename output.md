| - | .env | docker-env_file | docker-env_injected | docker_compose-env_file | docker_compose-env_injected | docker_compose-injected | dotenv |
| - | - | - | - | - | - | - | - |
| STR_DIRECT | direct | direct | direct | direct | direct | direct | direct |
| STR_SINGLE | 'single' | 'single' | single | single | single | 'single' | single |
| STR_DOUBLE | "double" | "double" | double | double | double | "double" | double |
| STR_BACKTICK | \`backtick\` | \`backtick\` | \`backtick\` | \`backtick\` | \`backtick\` | \`backtick\` | \`backtick\` |
| STR_EMPTY |  |  |  |  |  |  |  |
| VAR | "var" | VAR | VAR | VAR | VAR | VAR | var |
| VAR1 | "var1" | "var1" | var1 | var1 | var1 | "var1" | var1 |
| DOLLAR_ESCAPE | $$VAR1 | $$VAR1 | VAR1 | $$VAR1 | VAR1 | $VAR1 | $$VAR1 |
| VAR_DIRECT | $VAR1 | $VAR1 | var1 | $VAR1 | var1 |  | $VAR1 |
| VAR_SINGLE | '$VAR1' | '$VAR1' | $VAR1 | $VAR1 | $VAR1 | '' | $VAR1 |
| VAR_DOUBLE | $VAR1$VAR1 | $VAR1$VAR1 | var1var1 | $VAR1$VAR1 | var1var1 |  | $VAR1$VAR1 |
| VAR_CURVE | ${VAR1} | ${VAR1} | var1 | var1 | var1 |  | ${VAR1} |
| VAR_CURVE_SINGLE | '${VAR1}' | '${VAR1}' | ${VAR1} | var1 | ${VAR1} | '' | ${VAR1} |
| VAR_CURVE_DOUBLE | "${VAR1}" | "${VAR1}" | var1 | var1 | var1 | "" | ${VAR1} |
| VAR_DOUBLE_CURVE | ${VAR1}${VAR1} | ${VAR1}${VAR1} | var1var1 | var1var1 | var1var1 |  | ${VAR1}${VAR1} |
| VAR_SETTED1 | ${XXX:-$VAR1} | ${XXX:-$VAR1} | var1 | $VAR1 | var1 | $VAR1 | ${XXX:-$VAR1} |
| VAR_SETTED2 | ${STR_EMPTY:-$VAR1} | ${STR_EMPTY:-$VAR1} | var1 |  | var1 | $VAR1 | ${STR_EMPTY:-$VAR1} |
| VAR_DEFAULT_DEFAULT | ${XXX:-${YYY:-VAR1}} | ${XXX:-${YYY:-VAR1}} | VAR1 | ${YYY:-VAR1} | VAR1 | ${YYY:-VAR1} | ${XXX:-${YYY:-VAR1}} |