#!/usr/bin/env python3
"""Sequential (Contiguous) File Allocation - Files stored in consecutive blocks"""

def sequential_allocation(files, disk_size):
    """
    files: list of (filename, start_block, num_blocks)
    disk_size: total number of blocks
    """
    disk = [None] * disk_size  # None means free
    allocation = {}
    
    for filename, start, num_blocks in files:
        if start >= disk_size or start < 0:
            print(f"Error: Invalid start block {start} for {filename}")
            continue
        
        end = start + num_blocks
        if end > disk_size:
            print(f"Error: Not enough space for {filename}")
            continue
        
        # check if blocks are free
        for i in range(start, end):
            if disk[i] is not None:
                print(f"Error: Block {i} already allocated, can't allocate {filename}")
                break
        else:
            # allocate blocks
            for i in range(start, end):
                disk[i] = filename
            allocation[filename] = (start, num_blocks)
    
    return allocation, disk


def print_allocation(allocation):
    print("\nSequential (Contiguous) File Allocation:")
    print(f"{'File':<15} {'Start Block':<15} {'Number of Blocks'}")
    print("-" * 50)
    for filename, (start, num_blocks) in allocation.items():
        print(f"{filename:<15} {start:<15} {num_blocks}")


if __name__ == '__main__':
    files = [
        ("file1.txt", 0, 5),
        ("file2.txt", 5, 3),
        ("file3.txt", 10, 4),
    ]
    disk_size = 20
    
    allocation, disk = sequential_allocation(files, disk_size)
    print_allocation(allocation)
    
    print(f"\nDisk Map:")
    for i in range(disk_size):
        if disk[i]:
            print(f"Block {i}: {disk[i]}")
        else:
            print(f"Block {i}: Free")
