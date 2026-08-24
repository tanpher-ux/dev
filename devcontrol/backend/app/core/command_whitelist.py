"""
Controlled action whitelist for anything that touches the host system.

CRITICAL: No endpoint may ever execute arbitrary shell input from a client.
Every system action must map to one of the enum members below, each backed
by a fixed, parameterized implementation, never string-built shell commands.
"""
from enum import Enum


class ServerAction(str, Enum):
    START = "start"
    STOP = "stop"
    RESTART = "restart"
    LOGS = "logs"


class DockerAction(str, Enum):
    START = "start"
    STOP = "stop"
    RESTART = "restart"
    LOGS = "logs"


class GitAction(str, Enum):
    STATUS = "status"
    LOG = "log"
    DIFF = "diff"

# Anything not enumerated above (arbitrary shell, rm, sudo, curl|sh, etc.)
# is rejected at the API boundary before it ever reaches the executor.
