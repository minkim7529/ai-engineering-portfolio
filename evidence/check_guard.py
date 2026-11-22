"""Run with Python 3 and the path to my-changes.patch from e60a309."""
import ast
import csv
import re
import sys
from collections import Counter
from pathlib import Path


def load_guard(path):
    patch = Path(path).read_text(encoding="utf-8")
    start = patch.index("+IDENTITY_REVERSAL_RE = re.compile(")
    lines = patch[start:].splitlines()
    assignment = "\n".join(line[1:] for line in lines[:lines.index("+)") + 1])
    pattern = ast.parse(assignment).body[0].value.args[0]
    return re.compile(ast.literal_eval(pattern))


if __name__ == "__main__":
    guard = load_guard(sys.argv[1])
    counts = Counter()
    with Path(__file__).with_name("guard-cases.tsv").open(encoding="utf-8") as cases:
        for row in csv.DictReader(cases, delimiter="\t"):
            actual = "block" if guard.search(row["sentence"]) else "keep"
            counts[row["expected"], actual] += 1
            print(row["expected"], actual, row["sentence"], sep="\t")
    for expected in ("block", "keep"):
        for actual in ("block", "keep"):
            print(expected, actual, counts[expected, actual])
