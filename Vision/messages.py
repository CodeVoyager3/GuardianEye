from uagents import Model
from typing import List

class ThreatReport(Model):
    type: str
    sector: str
    confidence: float
    timestamp: float

class TribunalDecision(Model):
    consensus_action: str
    logs: List[str]
