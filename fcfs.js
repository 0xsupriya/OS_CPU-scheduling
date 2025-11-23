#!/usr/bin/env node
/**
 * FCFS (First-Come First-Serve) - Non-preemptive scheduling
 */

function fcfs(processes) {
    // sort by arrival time (stable)
    const procs = [...processes].sort((a, b) => a.arrival - b.arrival);
    let time = 0;
    const result = [];
    
    for (const proc of procs) {
        const start = Math.max(time, proc.arrival);
        const completion = start + proc.burst;
        const turnaround = completion - proc.arrival;
        const waiting = start - proc.arrival;
        
        result.push({
            pid: proc.pid,
            arrival: proc.arrival,
            burst: proc.burst,
            start,
            completion,
            turnaround,
            waiting
        });
        
        time = completion;
    }
    
    return result;
}

function printTable(result) {
    console.log("PID".padStart(4), "AT".padStart(4), "BT".padStart(4), 
                "ST".padStart(4), "CT".padStart(4), "TAT".padStart(5), "WT".padStart(5));
    
    for (const row of result) {
        console.log(
            String(row.pid).padStart(4),
            String(row.arrival).padStart(4),
            String(row.burst).padStart(4),
            String(row.start).padStart(4),
            String(row.completion).padStart(4),
            String(row.turnaround).padStart(5),
            String(row.waiting).padStart(5)
        );
    }
    
    const n = result.length;
    const avgTAT = result.reduce((sum, r) => sum + r.turnaround, 0) / n;
    const avgWT = result.reduce((sum, r) => sum + r.waiting, 0) / n;
    
    console.log(`\nAverage Turnaround Time = ${avgTAT.toFixed(2)}`);
    console.log(`Average Waiting Time    = ${avgWT.toFixed(2)}`);
}

// Main execution
if (require.main === module) {
    const processes = [
        { pid: 1, arrival: 0, burst: 5 },
        { pid: 2, arrival: 2, burst: 3 },
        { pid: 3, arrival: 4, burst: 1 },
        { pid: 4, arrival: 6, burst: 2 }
    ];
    
    const result = fcfs(processes);
    console.log("FCFS Scheduling:\n");
    printTable(result);
}

module.exports = { fcfs, printTable };
