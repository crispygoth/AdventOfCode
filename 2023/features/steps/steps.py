from behave import given, when, then
from click.testing import CliRunner
from hamcrest import assert_that, equal_to
from importlib import import_module
from main import app
import typer
from pathlib import Path
import os

@given('the input data')
def step_impl(context):
    context.input_text = context.text

@when('the {command} {subcommand} is run')
def step_impl(context, command, subcommand):
    runner = CliRunner()
    with runner.isolated_filesystem():
        Path('testinput.txt').write_text(context.input_text, newline=os.linesep)

        context.cli_result = runner.invoke(typer.main.get_command(app), [command, subcommand, '--input-file', 'testinput.txt'])

@then('the command exits successfully')
def step_impl(context):
    assert_that(context.cli_result.exit_code, equal_to(0))

@then('the result is {result}')
def step_impl(context, result):
    assert_that(context.cli_result.stdout.strip('\n'), equal_to(result))