#!/usr/bin/env node
/**
 * Round Robin Scheduling
 */

function roundRobin(processes, timeQuantum) {
    const procs = [...processes].sort((a, b) => a.arrival - b.arrival);
    let time = 0;
    const queue = [];
    const completionTime = {};
    
    // track remaining burst time
    const remaining = procs.map(p => ({
        ...p,
        remainingBurst: p.burst
    }));
    
    let idx = 0;
    
    while (queue.length > 0 || idx < remaining.length) {
        // add newly arrived processes
        while (idx < remaining.length && remaining[idx].arrival <= time) {
            queue.push(remaining[idx]);
            idx++;
        }
        
        if (queue.length > 0) {
            const current = queue.shift();
            
            const execTime = Math.min(timeQuantum, current.remainingBurst);
            time += execTime;
            current.remainingBurst -= execTime;
            
            // add newly arrived during execution
            while (idx < remaining.length && remaining[idx].arrival <= time) {
                queue.push(remaining[idx]);
                idx++;
            }
            
            if (current.remainingBurst > 0) {
                queue.push(current);
            } else {
                completionTime[current.pid] = time;
            }
        } else {
            // idle
            if (idx < remaining.length) {
                time = remaining[idx].arrival;
            }
        }
    }
    
    // build result
    const result = procs.map(p => {
        const ct = completionTime[p.pid];
        const tat = ct - p.arrival;
        const wt = tat - p.burst;
        return {
            pid: p.pid,
            arrival: p.arrival,
            burst: p.burst,
            completion: ct,
            turnaround: tat,
            waiting: wt
        };
    });
    
    result.sort((a, b) => a.pid - b.pid);
    return result;
}

function printTable(result) {
    console.log("PID".padStart(4), "AT".padStart(4), "BT".padStart(4), 
                "CT".padStart(4), "TAT".padStart(5), "WT".padStart(5));
    
    for (const row of result) {
        console.log(
            String(row.pid).padStart(4),
            String(row.arrival).padStart(4),
            String(row.burst).padStart(4),
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
        { pid: 2, arrival: 1, burst: 3 },
        { pid: 3, arrival: 2, burst: 1 },
        { pid: 4, arrival: 3, burst: 2 }
    ];
    
    const quantum = 2;
    const result = roundRobin(processes, quantum);
    console.log(`Round Robin Scheduling (Time Quantum = ${quantum}):\n`);
    printTable(result);
}

module.exports = { roundRobin, printTable };
