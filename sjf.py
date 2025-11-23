#!/usr/bin/env python3
"""SJF (Shortest Job First) - Non-preemptive scheduling"""

def sjf(processes):
    """processes: list of (pid, arrival_time, burst_time)"""
    procs = sorted(processes, key=lambda p: (p[1], p[2]))  # sort by arrival, then burst
    time = 0
    result = []
    ready = []
    remaining = procs[:]
    
    while remaining or ready:
        # add newly arrived processes to ready queue
        while remaining and remaining[0][1] <= time:
            ready.append(remaining.pop(0))
        
        if ready:
            # pick shortest job
            ready.sort(key=lambda p: p[2])
            pid, arrival, burst = ready.pop(0)
            start = time
            completion = start + burst
            turnaround = completion - arrival
            waiting = start - arrival
            result.append((pid, arrival, burst, start, completion, turnaround, waiting))
            time = completion
        else:
            # idle time
            if remaining:
                time = remaining[0][1]
    
    return result


def print_table(result):
    print("{:>4} {:>4} {:>4} {:>4} {:>4} {:>5} {:>5}".format("PID", "AT", "BT", "ST", "CT", "TAT", "WT"))
    for row in result:
        print("{:>4} {:>4} {:>4} {:>4} {:>4} {:>5} {:>5}".format(*row))
    n = len(result)
    avg_tat = sum(r[5] for r in result) / n
    avg_wt = sum(r[6] for r in result) / n
    print(f"\nAverage Turnaround Time = {avg_tat:.2f}")
    print(f"Average Waiting Time    = {avg_wt:.2f}")


if __name__ == '__main__':
    processes = [
        (1, 0, 6),
        (2, 2, 2),
        (3, 5, 8),
        (4, 1, 3),
    ]
    res = sjf(processes)
    print("SJF Scheduling:\n")
    print_table(res)
