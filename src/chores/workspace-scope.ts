/* Maintenance probes normally run inside one discovered repository, where a `refs/` directory is ordinary project content. */
export const WORKSPACE_ROOT_EXCLUDE_ENV = `INTENTIC_WORKSPACE_ROOT_EXCLUDE`;

// Unquoted parameter expansion is intentional: when the variable is absent it contributes zero arguments;
// when present, each expression expands to one whitespace-free CLI argument. The backend's runner supplies
// the value (the reference shelf's name), never from user input.
export const WORKSPACE_ROOT_RG_EXCLUDE_ARG = `\${${WORKSPACE_ROOT_EXCLUDE_ENV}:+--glob=!/\${${WORKSPACE_ROOT_EXCLUDE_ENV}}/**}`;
export const WORKSPACE_ROOT_JSCPD_EXCLUDE_ARG = `\${${WORKSPACE_ROOT_EXCLUDE_ENV}:+--ignore=\${${WORKSPACE_ROOT_EXCLUDE_ENV}}/**}`;
