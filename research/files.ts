export type Files<ID extends string = string> = {[id in ID]: {
  "path": string|false
  "id": ID
}}

export const files: Files = {
  "EXPORT": {
    "path": "run.sh",
    "id": "EXPORT",
  },
  "RUN": {
    "path": false,
    "id": "RUN",
  },
  "INLINE": {
    "path": "docker-compose.yml",
    "id": "INLINE",
  },
  "ROOT": {
    "path": ".env",
    "id": "ROOT",
  },
  // TODO "ROOT2": {},
  "INTERNAL_1": {
    "path": "docker/.file1.env",
    "id": "INTERNAL_1",
  },
  "INTERNAL_2": {
    "path": "docker/.file2.env",
    "id": "INTERNAL_2",
  },
  "DOCKER": {
    "path": "docker/Dockerfile",
    "id": "DOCKER",
  }
}
