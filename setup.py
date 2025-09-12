from setuptools import setup, find_packages

with open("requirements.txt") as f:
    install_requires = [l.strip() for l in f if l.strip() and not l.startswith("#")]

setup(
    name="neohcm",
    version="0.1.1",
    description="NeoHCM - Human Capital Management for Frappe",
    author="Neotec",
    author_email="support@eotec.ai",
    license="GPL-3.0-or-later",
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    install_requires=install_requires,
)
