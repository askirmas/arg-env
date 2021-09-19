

[[_TOC_]]

|                                                              | shell | env_file | environment | Dockerfile |
| ------------------------------------------------------------ | ----- | -------- | ----------- | ---------- |
| # Straight stuff                                             |       |          |             |            |
| SPEC_VALUE_                                                  | +     | +        | +           | -          |
| SPEC_VALUE_EMPTY=                                            | +     | +        | +           | +          |
| SPEC_VALUE_DIRECT=direct                                     | +     | +        | +           | +          |
| SPEC_VALUE_SINGLE='single'                                   | +     | +        | +           | +          |
| SPEC_VALUE_DOUBLE="double"                                   | +     | +        | +           | +          |
| SPEC_VALUE_BACKTICK=backtick                                 | +     | +        | +           | +          |
| SPEC_VALUE_BASH=$'bash'                                      | +     | +        | -           | +          |
| SPEC_VALUE_SPACE=abc def                                     | +     | +        | +           | -          |
| SPEC_lowercase=Lowercase                                     | +     | +        | +           | +          |
|                                                              |       |          |             |            |
| # Overwrite                                                  |       |          |             |            |
| SPEC_OVERWRITE=1                                             | +     | +        | +           | +          |
| SPEC_OVERWRITE=2                                             | +     | +        | +           | +          |
|                                                              |       |          |             |            |
| # Commented value                                            |       |          |             |            |
| SPEC_COMMENTED_VALUE=#commented                              | +     | +        | +           | +          |
| SPEC_COMMENTED_MIDDLE=comment#ed                             | +     | +        | +           | +          |
| SPEC_COMMENTED_SPACE=comment #ed                             | +     | +        | +           | -          |
| SPEC_COMMENTED_KEY#KEY=commented                             | +     | +        | +           | +          |
| #SPEC_COMMENTED=comment                                      | +     | +        | -           | +          |
|                                                              |       |          |             |            |
| # Tricky                                                     |       |          |             |            |
| SPEC_ONLY_SINGLE='                                           | -     | +        | +           | -          |
| SPEC_ESCAPE_DOUBLE="\""                                      | +     | +        | +           | +          |
| SPEC_WEIRD_ONELINE_1=1; SPEC_WEIRD_ONELINE_2=1               | +     | +        | +           | +          |
| SPEC_WEIRD_ONELINE_3=1 SPEC_WEIRD_ONELINE_4=1                | +     | +        | +           | +          |
| SPEC_WEIRD_SUBSHELL=$(echo 1)                                | +     | +        | -           | -          |
| &nbsp;SPEC_WEIRD_LEADING_SPACE=space                         | +     | +        | +           | +          |
| &emsp;SPEC_WEIRD_LEADING_TAB=tab                             | +     | +        | -           | +          |
| -SPEC_WEIRD_LEADING_DASH=dash1                               | +     | +        | +           | +          |
| $SPEC_WEIRD_LEADING_DOLLAR_1=ld1                             | +     | +        | -           | -          |
| \$SPEC_WEIRD_LEADING_DOLLAR_2=ld2                            | +     | +        | +           | +          |
| 1SPEC_WEIRD_LEADING_DIGIT=digit                              | +     | +        | +           | +          |
| =SPEC_WEIRD_LEADING_EQ_1=leadEq1                             | +     | -        | -           | -          |
| \=SPEC_WEIRD_LEADING_EQ_2=leadEq2                            | +     | +        | +           | -          |
|                                                              |       |          |             |            |
| # Not standard names                                         |       |          |             |            |
| SPEC_WEIRD_-=-                                               | +     | +        | +           | +          |
| SPEC_WEIRD_:=:                                               | +     | +        | -           | +          |
| SPEC_WEIRD_@=@                                               | +     | +        | +           | +          |
| SPEC_WEIRD_\===                                              | +     | +        | +           | +          |
|                                                              |       |          |             |            |
| #                                                            |       |          |             |            |
| SPEC_REUSE_ASSIGNED=assigned                                 | +     | +        | +           | +          |
|                                                              |       |          |             |            |
| # $$                                                         |       |          |             |            |
| SPEC_WEIRD_DOUBLE_DOLLAR=$$DOLLAR                            | -     | +        | +           | +          |
| SPEC_WEIRD_DOUBLE_DOLLAR_2=$$SPEC_REUSE_ASSIGNED             | -     | +        | +           | +          |
|                                                              |       |          |             |            |
| # Reuse                                                      |       |          |             |            |
| SPEC_REUSE_DIRECT=$SPEC_REUSE_ASSIGNED                       | +     | +        | +           | +          |
| SPEC_REUSE_SINGLE='$SPEC_REUSE_ASSIGNED'                     | +     | +        | +           | +          |
| SPEC_REUSE_DOUBLE="$SPEC_REUSE_ASSIGNED"                     | +     | +        | +           | +          |
| SPEC_REUSE_CURVES=${SPEC_REUSE_ASSIGNED}                     | +     | +        | +           | +          |
| SPEC_REUSE_EXPR_SINGLE_1='${SPEC_REUSE_ASSIGNED} is ${SPEC_REUSE_ASSIGNED}' | +     | +        | +           | +          |
| SPEC_REUSE_EXPR_SINGLE_2='${SPEC_UNDEFINED} is not ${SPEC_REUSE_ASSIGNED}' | +     | +        | +           | +          |
| SPEC_REUSE_EXPR_DOUBLE_1="${SPEC_REUSE_ASSIGNED} is ${SPEC_REUSE_ASSIGNED}" | +     | +        | +           | +          |
| SPEC_REUSE_EXPR_DOUBLE_2="${SPEC_UNDEFINED} is not ${SPEC_REUSE_ASSIGNED}" | +     | +        | +           | +          |
|                                                              |       |          |             |            |
| # Defaults and Errors                                        |       |          |             |            |
| SPEC_DEFAULT_FALSY_0=${SPEC_REUSE_ASSIGNED:-def}             | +     | +        | +           | +          |
| SPEC_DEFAULT_UNDEF_0=${SPEC_REUSE_ASSIGNED-def}              | +     | +        | +           | -          |
| SPEC_DEFAULT_FALSY_1=${SPEC_UNDEFINED:-${SPEC_REUSE_ASSIGNED}} | +     | +        | +           | +          |
| SPEC_DEFAULT_UNDEF_1=${SPEC_UNDEFINED-${SPEC_REUSE_ASSIGNED}} | +     | +        | +           | -          |
|                                                              |       |          |             |            |
| SPEC_ERROR_FALSY_0=${SPEC_REUSE_ASSIGNED?def}                | +     | +        | -           | +          |
| SPEC_ERROR_UNDEF_0=${SPEC_REUSE_ASSIGNED:?def}               | +     | +        | -           | +          |
| SPEC_ERROR_FALSY_1=${SPEC_UNDEFINED:?${SPEC_REUSE_ASSIGNED}} | -     | +        | -           | -          |
| SPEC_ERROR_UNDEF_1=${SPEC_UNDEFINED?${SPEC_REUSE_ASSIGNED}}  | -     | +        | -           | -          |
|                                                              |       |          |             |            |
| # Meta naming                                                |       |          |             |            |
| SPEC_META_=SPEC_REUSE_ASSIGNED                               | +     | +        | +           | -          |
| SPEC_META_1=${!SPEC_META_}                                   | +     | +        | -           | -          |
| SPEC_META_2=$${!SPEC_META_}                                  | -     | +        | +           | -          |
| SPEC_META_3=${${SPEC_META_}}                                 | +     | +        | -           | -          |
|                                                              |       |          |             |            |
| # Unquoted                                                   |       |          |             |            |
| SPEC_WEIRD_UNQUOTED=" unq                                    | +     | +        | -           | -          |
