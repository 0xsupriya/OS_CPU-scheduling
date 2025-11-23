#!/usr/bin/env python3
"""Priority Scheduling - Non-preemptive (lower number = higher priority)"""

def priority_scheduling(processes):
    """processes: list of (pid, arrival_time, burst_time, priority)"""
    procs = sorted(processes, key=lambda p: p[1])  # sort by arrival
    time = 0
    result = []
    ready = []
    remaining = procs[:]
    
    while remaining or ready:
        # add newly arrived processes to ready queue
        while remaining and remaining[0][1] <= time:
            ready.append(remaining.pop(0))
        
        if ready:
            # pick highest priority (lowest number)
            ready.sort(key=lambda p: (p[3], p[1]))  # priority, then arrival
            pid, arrival, burst, priority = ready.pop(0)
            start = time
            completion = start + burst
            turnaround = completion - arrival
            waiting = start - arrival
            result.append((pid, arrival, burst, priority, start, completion, turnaround, waiting))
            time = completion
        else:
            # idle time
            if remaining:
                time = remaining[0][1]
    
    return result


def print_table(result):
    print("{:>4} {:>4} {:>4} {:>4} {:>4} {:>4} {:>5} {:>5}".format("PID", "AT", "BT", "PR", "ST", "CT", "TAT", "WT"))
    for row in result:
        print("{:>4} {:>4} {:>4} {:>4} {:>4} {:>4} {:>5} {:>5}".format(*row))
    n = len(result)
    avg_tat = sum(r[6] for r in result) / n
    avg_wt = sum(r[7] for r in result) / n
    print(f"\nAverage Turnaround Time = {avg_tat:.2f}")
    print(f"Average Waiting Time    = {avg_wt:.2f}")


if __name__ == '__main__':
    # (pid, arrival_time, burst_time, priority)
    processes = [
        (1, 0, 4, 2),
        (2, 1, 3, 1),
        (3, 2, 1, 3),
        (4, 3, 5, 2),
    ]
    res = priority_scheduling(processes)
    print("Priority Scheduling:\n")
    print_table(res)
