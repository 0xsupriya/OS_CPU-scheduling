#!/usr/bin/env python3
"""Simple, short FCFS (First-Come First-Serve) scheduler example.
Input: list of (pid, arrival_time, burst_time).
Outputs: completion time, turnaround time, waiting time and averages.
"""

def fcfs(processes):
    # sort by arrival time (stable)
    procs = sorted(processes, key=lambda p: p[1])
    time = 0
    result = []
    for pid, arrival, burst in procs:
        start = max(time, arrival)
        completion = start + burst
        turnaround = completion - arrival
        waiting = start - arrival
        result.append((pid, arrival, burst, start, completion, turnaround, waiting))
        time = completion
    return result


def print_table(result):
    hdr = ("PID", "AT", "BT", "ST", "CT", "TAT", "WT")
    print("{:>4} {:>4} {:>4} {:>4} {:>4} {:>5} {:>5}".format(*hdr))
    for row in result:
        print("{:>4} {:>4} {:>4} {:>4} {:>4} {:>5} {:>5}".format(*row))
    n = len(result)
    avg_tat = sum(r[5] for r in result) / n
    avg_wt = sum(r[6] for r in result) / n
    print()
    print(f"Average Turnaround Time = {avg_tat:.2f}")
    print(f"Average Waiting Time    = {avg_wt:.2f}")


if __name__ == '__main__':
    # small example: list of (pid, arrival_time, burst_time)
    processes = [
        (1, 0, 5),
        (2, 2, 3),
        (3, 4, 1),
        (4, 6, 2),
    ]
    res = fcfs(processes)
    print_table(res)
