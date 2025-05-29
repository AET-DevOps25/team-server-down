provider "aws" {
  region = "us-east-1"
}

variable vpc_cidr_block {}
variable subnet_1_cidr_block {}
variable avail_zone {}
variable env_prefix {}
variable instance_type {}
variable ssh_key {}
# variable my_ip {}
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

resource "aws_key_pair" "ssh-key" {
  key_name   = "teamserverdown-key"
  public_key = file(var.ssh_key)
}

output "server-ip" {
  value = aws_instance.teamserverdown-server.public_ip
}

resource "aws_instance" "teamserverdown-server" {
  ami                         = "ami-084568db4383264d4"
  instance_type               = var.instance_type
  key_name                    = "teamserverdown-key"
  associate_public_ip_address = true
  subnet_id                   = aws_subnet.teamserverdown-subnet-1.id
  vpc_security_group_ids      = [aws_security_group.teamserverdown-sg.id]
  availability_zone			      = var.avail_zone

  tags = {
    Name = "${var.env_prefix}-server"
  }
}

resource "null_resource" "wait_for_ssh" {
  depends_on = [aws_instance.teamserverdown-server]

  provisioner "local-exec" {
    command = "bash -c 'until nc -zv ${aws_instance.teamserverdown-server.public_ip} 22; do sleep 5; done'"
  }
}

resource "null_resource" "configure_server" {
  depends_on = [null_resource.wait_for_ssh]

  triggers = {
    trigger = aws_instance.teamserverdown-server.public_ip
  }
  provisioner "local-exec" {
    working_dir = "/Users/leonliang/tum-informatik/SS25/DevOps/team-server-down/infrastructure/ansible"
    command = "ansible-playbook --inventory ${aws_instance.teamserverdown-server.public_ip}, --private-key ${var.ssh_private_key} --user ubuntu playbook.yml --ssh-extra-args='-o StrictHostKeyChecking=no'"
  }
}