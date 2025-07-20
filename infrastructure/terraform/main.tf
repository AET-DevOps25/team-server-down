provider "aws" {
  region = "us-east-1"
}

variable vpc_cidr_block {}
variable subnet_1_cidr_block {}
variable avail_zone {}
variable env_prefix {}
variable instance_type {}
variable ssh_key {}
variable ssh_private_key{}


resource "aws_vpc" "teamserverdown-vpc" {
  cidr_block = var.vpc_cidr_block
  tags = {
    Name = "${var.env_prefix}-vpc"
  }
}

resource "aws_subnet" "teamserverdown-subnet-1" {
  vpc_id = aws_vpc.teamserverdown-vpc.id
  cidr_block = var.subnet_1_cidr_block
  availability_zone = var.avail_zone
  tags = {
    Name = "${var.env_prefix}-subnet-1"
  }
}

resource "aws_security_group" "teamserverdown-sg" {
  name   = "teamserverdown-sg"
  vpc_id = aws_vpc.teamserverdown-vpc.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Change to my_ip
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    cidr_blocks     = ["0.0.0.0/0"]
    prefix_list_ids = []
  }

  tags = {
    Name = "${var.env_prefix}-sg"
  }
}

resource "aws_internet_gateway" "teamserverdown-igw" {
  vpc_id = aws_vpc.teamserverdown-vpc.id

  tags = {
    Name = "${var.env_prefix}-internet-gateway"
  }
}

resource "aws_route_table" "teamserverdown-route-table" {
  vpc_id = aws_vpc.teamserverdown-vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.teamserverdown-igw.id
  }

  # default route, mapping VPC CIDR block to "local", created implicitly and cannot be specified.

  tags = {
    Name = "${var.env_prefix}-route-table"
  }
}

# Associate subnet with Route Table
resource "aws_route_table_association" "a-rtb-subnet" {
  subnet_id      = aws_subnet.teamserverdown-subnet-1.id
  route_table_id = aws_route_table.teamserverdown-route-table.id
}

# resource "aws_key_pair" "ssh-key" {
#   key_name   = "teamserverdown-key"
#   public_key = file(var.ssh_key)
# }

resource "aws_ebs_volume" "teamserverdown_volume" {
  availability_zone = var.avail_zone
  size              = 10  
  tags = {
    Name = "${var.env_prefix}-ebs-volume"
  }
}

resource "aws_volume_attachment" "teamserverdown_attachment" {
  device_name = "/dev/xvdf" 
  volume_id   = aws_ebs_volume.teamserverdown_volume.id
  instance_id = aws_instance.teamserverdown-server.id
  force_detach = true  
}


resource "aws_instance" "teamserverdown-server" {
  ami                         = "ami-084568db4383264d4"
  instance_type               = var.instance_type
  key_name                    = "teamserverdown-key"
  subnet_id                   = aws_subnet.teamserverdown-subnet-1.id
  vpc_security_group_ids      = [aws_security_group.teamserverdown-sg.id]
  availability_zone			      = var.avail_zone

  user_data = <<-EOF
              #!/bin/bash
              until ls /dev/xvdf; do sleep 1; done

              file -s /dev/xvdf | grep ext4 || mkfs.ext4 /dev/xvdf

              mkdir -p /mnt/data
              mount /dev/xvdf /mnt/data

              echo '/dev/xvdf /mnt/data ext4 defaults,nofail 0 2' >> /etc/fstab
              EOF


  tags = {
    Name = "${var.env_prefix}-server"
  }
}

resource "aws_eip" "teamserverdown_eip" {
}

resource "aws_eip_association" "eip_assoc" {
  instance_id   = aws_instance.teamserverdown-server.id
  allocation_id = aws_eip.teamserverdown_eip.id
}

output "static_public_ip" {
  value = aws_eip.teamserverdown_eip.public_ip
}

resource "null_resource" "wait_for_ssh" {
  depends_on = [aws_eip_association.eip_assoc]

  provisioner "local-exec" {
    command = "bash -c 'until nc -zv ${aws_eip.teamserverdown_eip.public_ip} 22; do sleep 5; done'"
  }
}

resource "null_resource" "configure_server" {
  depends_on = [null_resource.wait_for_ssh]

  triggers = {
    trigger = aws_eip.teamserverdown_eip.public_ip
  }
  provisioner "local-exec" {
    working_dir = "/Users/leon.liang/Downloads/team-server-down/infrastructure/ansible"
    command = "ansible-playbook --inventory ${aws_eip.teamserverdown_eip.public_ip}, --private-key ${var.ssh_private_key} --user ubuntu playbook.yml --ssh-extra-args='-o StrictHostKeyChecking=no'"
  }
}
