| - | FROM_GLOBAL1 | FROM_GLOBAL2 | FROM_GLOBAL3 | FROM_GLOBAL4 | STR_DIRECT | STR_SINGLE | STR_DOUBLE | STR_BACKTICK | STR_EMPTY | VAR | VAR1 | DOUBLE_DOLLAR | VAR_DIRECT | VAR_SINGLE | VAR_DOUBLE | VAR_CURVE | VAR_CURVE_SINGLE | VAR_CURVE_DOUBLE | VAR_REPEAT | VAR_DEFAULT1 | VAR_DEFAULT2 | VAR_DEFAULT_DEFAULT | GLOBAL |
| - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - |
| .env | $GLOBAL | ${GLOBAL} | "$GLOBAL" | "${GLOBAL}" | direct | 'single' | "double" | \`backtick\` |  | "var" | "var1" | $$VAR1 | $VAR1 | '$VAR1' | "$VAR1" | ${VAR1} | '${VAR1}' | "${VAR1}" | $VAR1$VAR1 | ${XXX:-$VAR1} | ${STR_EMPTY:-$VAR1} | ${XXX:-${YYY:-VAR1}} | - |
| docker-env_file | $GLOBAL | ${GLOBAL} | "$GLOBAL" | "${GLOBAL}" | direct | 'single' | "double" | \`backtick\` |  | VAR | "var1" | $$VAR1 | $VAR1 | '$VAR1' | "$VAR1" | ${VAR1} | '${VAR1}' | "${VAR1}" | $VAR1$VAR1 | ${XXX:-$VAR1} | ${STR_EMPTY:-$VAR1} | ${XXX:-${YYY:-VAR1}} | - |
| docker-env_injected |  |  |  |  | direct | single | double | \`backtick\` |  | VAR | var1 | VAR1 | var1 | $VAR1 | var1 | var1 | ${VAR1} | var1 | var1var1 | var1 | var1 | VAR1 | - |
| docker_compose-env_file | $GLOBAL |  | $GLOBAL |  | direct | single | double | \`backtick\` |  | VAR | var1 | $$VAR1 | $VAR1 | $VAR1 | $VAR1 | var1 | var1 | var1 | $VAR1$VAR1 | $VAR1 |  | ${YYY:-VAR1} | - |
| docker_compose-env_injected |  |  |  |  | direct | single | double | \`backtick\` |  | VAR | var1 | VAR1 | var1 | $VAR1 | var1 | var1 | ${VAR1} | var1 | var1var1 | var1 | var1 | VAR1 | - |
| docker_compose-injected | Global | Global | "Global" | "Global" | direct | 'single' | "double" | \`backtick\` |  | VAR | "var1" | $VAR1 |  | '' | "" |  | '' | "" |  | $VAR1 | $VAR1 | ${YYY:-VAR1} | - |
| dotenv | $GLOBAL | ${GLOBAL} | $GLOBAL | ${GLOBAL} | direct | single | double | \`backtick\` |  | var | var1 | $$VAR1 | $VAR1 | $VAR1 | $VAR1 | ${VAR1} | ${VAR1} | ${VAR1} | $VAR1$VAR1 | ${XXX:-$VAR1} | ${STR_EMPTY:-$VAR1} | ${XXX:-${YYY:-VAR1}} | Global |
| dotenv-expanded | Global | Global | Global | Global | direct | single | double | \`backtick\` |  | var | var1 | $var1 | var1 | var1 | var1 | var1 | var1 | var1 | var1var1 | :-var1 | :-var1 | :-:-VAR1}} | Global |

| - | .env | docker-env_file | docker-env_injected | docker_compose-env_file | docker_compose-env_injected | docker_compose-injected | dotenv | dotenv-expanded |
| - | - | - | - | - | - | - | - | - |
| FROM_GLOBAL1 | $GLOBAL | $GLOBAL |  | $GLOBAL |  | Global | $GLOBAL | Global |
| FROM_GLOBAL2 | ${GLOBAL} | ${GLOBAL} |  |  |  | Global | ${GLOBAL} | Global |
| FROM_GLOBAL3 | "$GLOBAL" | "$GLOBAL" |  | $GLOBAL |  | "Global" | $GLOBAL | Global |
| FROM_GLOBAL4 | "${GLOBAL}" | "${GLOBAL}" |  |  |  | "Global" | ${GLOBAL} | Global |
| STR_DIRECT | direct | direct | direct | direct | direct | direct | direct | direct |
| STR_SINGLE | 'single' | 'single' | single | single | single | 'single' | single | single |
| STR_DOUBLE | "double" | "double" | double | double | double | "double" | double | double |
| STR_BACKTICK | \`backtick\` | \`backtick\` | \`backtick\` | \`backtick\` | \`backtick\` | \`backtick\` | \`backtick\` | \`backtick\` |
| STR_EMPTY |  |  |  |  |  |  |  |  |
| VAR | "var" | VAR | VAR | VAR | VAR | VAR | var | var |
| VAR1 | "var1" | "var1" | var1 | var1 | var1 | "var1" | var1 | var1 |
| DOUBLE_DOLLAR | $$VAR1 | $$VAR1 | VAR1 | $$VAR1 | VAR1 | $VAR1 | $$VAR1 | $var1 |
| VAR_DIRECT | $VAR1 | $VAR1 | var1 | $VAR1 | var1 |  | $VAR1 | var1 |
| VAR_SINGLE | '$VAR1' | '$VAR1' | $VAR1 | $VAR1 | $VAR1 | '' | $VAR1 | var1 |
| VAR_DOUBLE | "$VAR1" | "$VAR1" | var1 | $VAR1 | var1 | "" | $VAR1 | var1 |
| VAR_CURVE | ${VAR1} | ${VAR1} | var1 | var1 | var1 |  | ${VAR1} | var1 |
| VAR_CURVE_SINGLE | '${VAR1}' | '${VAR1}' | ${VAR1} | var1 | ${VAR1} | '' | ${VAR1} | var1 |
| VAR_CURVE_DOUBLE | "${VAR1}" | "${VAR1}" | var1 | var1 | var1 | "" | ${VAR1} | var1 |
| VAR_REPEAT | $VAR1$VAR1 | $VAR1$VAR1 | var1var1 | $VAR1$VAR1 | var1var1 |  | $VAR1$VAR1 | var1var1 |
| VAR_DEFAULT1 | ${XXX:-$VAR1} | ${XXX:-$VAR1} | var1 | $VAR1 | var1 | $VAR1 | ${XXX:-$VAR1} | :-var1 |
| VAR_DEFAULT2 | ${STR_EMPTY:-$VAR1} | ${STR_EMPTY:-$VAR1} | var1 |  | var1 | $VAR1 | ${STR_EMPTY:-$VAR1} | :-var1 |
| VAR_DEFAULT_DEFAULT | ${XXX:-${YYY:-VAR1}} | ${XXX:-${YYY:-VAR1}} | VAR1 | ${YYY:-VAR1} | VAR1 | ${YYY:-VAR1} | ${XXX:-${YYY:-VAR1}} | :-:-VAR1}} |
| GLOBAL | - | - | - | - | - | - | Global | Global |