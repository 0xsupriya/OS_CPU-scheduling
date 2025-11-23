#!/usr/bin/env node
/**
 * SRTF (Shortest Remaining Time First) - Preemptive SJF
 */

function srtf(processes) {
    const procs = [...processes].sort((a, b) => a.arrival - b.arrival);
    const n = procs.length;
    const remainingTime = {};
    const completionTime = {};
    
    procs.forEach(p => {
        remainingTime[p.pid] = p.burst;
    });
    
    let time = 0;
    let completed = 0;
    const maxTime = Math.max(...procs.map(p => p.arrival)) + procs.reduce((sum, p) => sum + p.burst, 0);
    
    while (completed < n && time < maxTime) {
        // find process with shortest remaining time that has arrived
        const available = procs.filter(p => p.arrival <= time && remainingTime[p.pid] > 0);
        
        if (available.length > 0) {
            // pick shortest remaining time
            available.sort((a, b) => remainingTime[a.pid] - remainingTime[b.pid] || a.arrival - b.arrival);
            const current = available[0];
            
            // execute for 1 time unit
            remainingTime[current.pid]--;
            time++;
            
            // check if completed
            if (remainingTime[current.pid] === 0) {
                completionTime[current.pid] = time;
                completed++;
            }
        } else {
            time++;
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
        { pid: 1, arrival: 0, burst: 8 },
        { pid: 2, arrival: 1, burst: 4 },
        { pid: 3, arrival: 2, burst: 2 },
        { pid: 4, arrival: 3, burst: 1 }
    ];
    
    const result = srtf(processes);
    console.log("SRTF (Shortest Remaining Time First):\n");
    printTable(result);
}

module.exports = { srtf, printTable };
