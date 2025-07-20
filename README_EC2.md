# EC2 Instance Setup

This EC2 instance is configured to run a Docker-based application with the following services:

- **Traefik Reverse Proxy**
- **Backend Server**
- **Frontend Client**
- **PostgreSQL Database**

## Accessing the EC2 Instance

Login into AWS Academy lab and then 


To enable Terraform and AWS CLI to communicate with AWS, you need to configure your AWS credentials and config files on your local machine:

- Create or open the AWS credentials file at `~/.aws/credentials` and add your credentials:

Create or open the AWS config file at ~/.aws/config and set the default region and output format:

```bash
[default]
region = us-east-1
output = json


```


```ini
[default]
aws_access_key_id = YOUR_ACCESS_KEY_ID
aws_secret_access_key = YOUR_SECRET_ACCESS_KEY

To connect to the EC2 instance via SSH, use the following command:

```bash
ssh -i /path/to/your-key.pem ec2-user@<EC2_PUBLIC_IP>

```


Replace /path/to/your-key.pem with the path to your SSH private key.

Replace <EC2_PUBLIC_IP> with the public IP address of the EC2 instance.


### Provisioning with Ansible 
Provisioning with Ansible

The EC2 instance is provisioned and configured using Ansible with the following tasks:

- Install Docker and Docker Compose
- Create a Linux user `teamserverdown`
- Clone the project repository from GitHub
- Generate environment variables dynamically based on the instance public IP
- Start Docker containers via Docker Compose


### Infrastructure Automation with Terraform
Terraform is used to provision the AWS infrastructure, including:

- VPC and Subnet setup
- Internet Gateway and Route Tables
- Security Group allowing SSH (port 22) and application ports
- EC2 instance creation with specified AMI, instance type, subnet, and key pair
- Key pair creation for SSH access
- Automated waiting for instance SSH availability
- Triggering Ansible playbook execution to provision the EC2 instance after launch


### Running Terraform
Make sure Terraform is installed locally.

Initialize Terraform:

```bash
terraform init

```

Apply the Terraform plan:

```bash
terraform apply
Confirm by typing yes when prompted.
```

Terraform will output the public IP address of the EC2 instance — use this IP to SSH.




