#!/usr/bin/env node
/**
 * SJF (Shortest Job First) - Non-preemptive scheduling
 */

function sjf(processes) {
    const procs = [...processes].sort((a, b) => a.arrival - b.arrival || a.burst - b.burst);
    let time = 0;
    const result = [];
    const ready = [];
    const remaining = [...procs];
    
    while (remaining.length > 0 || ready.length > 0) {
        // add newly arrived processes to ready queue
        while (remaining.length > 0 && remaining[0].arrival <= time) {
            ready.push(remaining.shift());
        }
        
        if (ready.length > 0) {
            // pick shortest job
            ready.sort((a, b) => a.burst - b.burst);
            const current = ready.shift();
            
            const start = time;
            const completion = start + current.burst;
            const turnaround = completion - current.arrival;
            const waiting = start - current.arrival;
            
            result.push({
                pid: current.pid,
                arrival: current.arrival,
                burst: current.burst,
                start,
                completion,
                turnaround,
                waiting
            });
            
            time = completion;
        } else {
            // idle time
            if (remaining.length > 0) {
                time = remaining[0].arrival;
            }
        }
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
        { pid: 1, arrival: 0, burst: 6 },
        { pid: 2, arrival: 2, burst: 2 },
        { pid: 3, arrival: 5, burst: 8 },
        { pid: 4, arrival: 1, burst: 3 }
    ];
    
    const result = sjf(processes);
    console.log("SJF Scheduling:\n");
    printTable(result);
}

module.exports = { sjf, printTable };
