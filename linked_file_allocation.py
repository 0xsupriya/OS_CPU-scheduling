#!/usr/bin/env python3
"""Linked File Allocation - Each block points to the next block"""

def linked_allocation(files, disk_size):
    """
    files: list of (filename, start_block, num_blocks)
    disk_size: total number of blocks
    """
    disk = [-1] * disk_size  # -1 means free, otherwise stores next block number
    allocation = {}
    
    for filename, start, num_blocks in files:
        if start >= disk_size or start < 0:
            print(f"Error: Invalid start block {start} for {filename}")
            continue
        
        # check if start block is free
        if disk[start] != -1:
            print(f"Error: Block {start} already allocated for {filename}")
            continue
        
        # allocate blocks
        blocks = [start]
        current = start
        
        for i in range(1, num_blocks):
            # find next free block
            next_block = None
            for j in range(disk_size):
                if disk[j] == -1 and j not in blocks:
                    next_block = j
                    break
            
            if next_block is None:
                print(f"Error: Not enough free blocks for {filename}")
                break
            
            disk[current] = next_block
            blocks.append(next_block)
            current = next_block
        
        disk[current] = -2  # -2 means end of file
        allocation[filename] = blocks
    
    return allocation, disk


def print_allocation(allocation):
    print("\nLinked File Allocation:")
    print(f"{'File':<15} {'Blocks'}")
    print("-" * 40)
    for filename, blocks in allocation.items():
        blocks_str = " -> ".join(map(str, blocks))
        print(f"{filename:<15} {blocks_str}")


if __name__ == '__main__':
    files = [
        ("file1.txt", 0, 3),
        ("file2.txt", 5, 4),
        ("file3.txt", 10, 2),
    ]
    disk_size = 20
    
    allocation, disk = linked_allocation(files, disk_size)
    print_allocation(allocation)
    
    print(f"\nDisk Status (showing links):")
    for i, link in enumerate(disk):
        if link == -1:
            status = "Free"
        elif link == -2:
            status = "End"
        else:
            status = f"-> {link}"
        if link != -1:
            print(f"Block {i}: {status}")
